# Importa bibliotecas necessárias
from flask import Flask, request, jsonify             # Flask para criar o servidor
from transformers import pipeline, Pipeline           # Hugging Face pipeline para análise de sentimentos
from deep_translator import GoogleTranslator          # Tradutor automático para traduzir o texto para inglês
import logging                                         # Para registrar logs no terminal

# --- CONFIGURAÇÕES INICIAIS ---
app = Flask(__name__)                                 # Criação do app Flask
logging.basicConfig(level=logging.INFO)               # Configuração do nível de log

# --- INICIALIZAÇÃO DO MODELO (ocorre apenas uma vez ao iniciar o app) ---
try:
    analisador: Pipeline = pipeline("sentiment-analysis")   # Carrega o modelo de análise de sentimentos
    logging.info("Modelo de análise de sentimentos carregado com sucesso.")
except Exception as e:
    logging.error("Erro ao carregar o modelo: %s", e)
    analisador = None                                       # Garante que o app continue mesmo com erro

# --- ROTA PRINCIPAL DA API ---
@app.route('/analisa_sentimento', methods=['POST'])
def analisa_sentimento():
    # Verifica se o modelo está disponível
    if not analisador:
        return jsonify({'erro': 'Modelo não disponível'}), 503

    try:
        # Captura o JSON enviado na requisição
        dados = request.get_json(force=True)
        texto = dados.get('texto', '').strip()  # Lê o campo "texto" e remove espaços

        if not texto:
            return jsonify({'erro': 'Texto não fornecido'}), 400

        # Traduz automaticamente para inglês (idioma do modelo)
        texto_em_ingles = GoogleTranslator(source='auto', target='en').translate(texto)

        # Realiza a análise de sentimento
        resultado = analisador(texto_em_ingles)

        # Retorna o resultado da análise
        return jsonify({
            'entrada': texto,                                # Texto original
            'traducao': texto_em_ingles,                     # Tradução automática
            'sentimento': resultado[0]['label'],             # Resultado do modelo: POSITIVE ou NEGATIVE
            'confianca': round(resultado[0]['score'] * 100, 2)  # Confiança (%) com 2 casas decimais
        })

    except Exception as e:
        logging.error("Erro na análise: %s", e)
        return jsonify({'erro': 'Erro interno ao processar o texto.'}), 500

# --- INICIALIZAÇÃO DO SERVIDOR LOCAL ---
if __name__ == '__main__':
    app.run(debug=True)    # Roda o app em modo debug no endereço http://127.0.0.1:5000
