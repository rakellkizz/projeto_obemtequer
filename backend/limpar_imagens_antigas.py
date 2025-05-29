# 🐍 Importa bibliotecas essenciais
import os                             # Para trabalhar com arquivos e diretórios
import time                           # Para lidar com marcação de tempo (timestamp)
from datetime import datetime         # Para converter timestamps em datas legíveis
from datetime import timedelta        # (Importado, mas não usado aqui — útil se for fazer cálculos com datas depois)

# 🔧 Caminho onde estão armazenadas as subpastas com as imagens (rostos)
PASTA_ROSTOS = r"D:\Users\Raquel\Desktop\projeto_obemtequer\backend\rostos_capturados"

# ⏰ Tempo limite (em horas) para considerar uma imagem como "antiga"
LIMITE_HORAS = 24

# ⏱️ Converte o limite de horas para segundos
LIMITE_SEGUNDOS = LIMITE_HORAS * 60 * 60  # 24h * 60min * 60seg = 86400 segundos

# 🔄 Função principal que faz a limpeza das imagens antigas
def limpar_imagens_antigas():
    agora = time.time()         # 📌 Pega o tempo atual (em segundos desde 1970, formato timestamp)
    deletadas = 0               # 🧮 Conta quantas imagens foram removidas

    # 🔍 Verifica se a pasta principal existe
    if not os.path.exists(PASTA_ROSTOS):
        print(f"⚠️ Pasta não encontrada: {PASTA_ROSTOS}")
        return  # Encerra a função se a pasta base não existir

    # 🗂️ Percorre todas as subpastas dentro da pasta principal (cada subpasta pode ser o nome de uma pessoa)
    for pasta_nome in os.listdir(PASTA_ROSTOS):
        caminho_pasta = os.path.join(PASTA_ROSTOS, pasta_nome)  # Monta o caminho completo da subpasta

        # ✅ Garante que é uma pasta (e não um arquivo solto)
        if not os.path.isdir(caminho_pasta):
            continue

        # 🖼️ Dentro de cada subpasta, percorre todos os arquivos
        for nome_arquivo in os.listdir(caminho_pasta):
            caminho_arquivo = os.path.join(caminho_pasta, nome_arquivo)  # Caminho completo do arquivo

            # 🎯 Verifica se é um arquivo de imagem com extensão válida
            if not nome_arquivo.lower().endswith(('.jpg', '.jpeg', '.png')):
                continue  # Pula se não for imagem

            # 📆 Verifica a data da última modificação do arquivo
            tempo_modificacao = os.path.getmtime(caminho_arquivo)  # Última modificação (em timestamp)
            tempo_passado = agora - tempo_modificacao              # Tempo decorrido desde a modificação

            # Converte o timestamp para uma data legível (ex: 2025-05-25 14:30:22)
            data_modificacao = datetime.fromtimestamp(tempo_modificacao).strftime('%Y-%m-%d %H:%M:%S')

            # 🧪 Mostra informações do arquivo (para conferência no console)
            print(f"📸 Arquivo: {nome_arquivo} | Modificado em: {data_modificacao} | Passado: {tempo_passado:.0f}s")

            # 🗑️ Se o tempo passado for maior que o limite, apaga o arquivo
            if tempo_passado > LIMITE_SEGUNDOS:
                try:
                    os.remove(caminho_arquivo)                          # Tenta apagar o arquivo
                    print(f"🗑️ Removido: {caminho_arquivo}")            # Confirmação no terminal
                    deletadas += 1                                      # Atualiza contador
                except Exception as e:
                    print(f"❌ Erro ao deletar {caminho_arquivo}: {e}") # Mostra o erro, se houver

    # ✅ Mensagem final após a varredura
    if deletadas > 0:
        print(f"\n✅ {deletadas} imagem(ns) antigas foram removidas com sucesso.")
    else:
        print("\n📂 Nenhuma imagem antiga para remover. Tudo limpo!")

# 🚀 Executa a função se este script for rodado diretamente
if __name__ == "__main__":
    print("🧹 Iniciando limpeza de imagens antigas...")
    limpar_imagens_antigas()
