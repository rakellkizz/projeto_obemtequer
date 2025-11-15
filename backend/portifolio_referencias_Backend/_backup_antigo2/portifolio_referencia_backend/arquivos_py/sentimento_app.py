# Importa o Streamlit para criar a interface web
import streamlit as st

# Importa o pipeline da Hugging Face para análise de sentimentos
from transformers import pipeline

# Importa o tradutor do Google para traduzir o texto do usuário
from googletrans import Translator

# Inicializa o tradutor
translator = Translator()

# Inicializa o pipeline de análise de sentimentos usando modelo pré-treinado
# Por padrão, usa o modelo 'distilbert-base-uncased-finetuned-sst-2-english'
analisador = pipeline("sentiment-analysis")

# Título do app no topo da página
st.title("Analisador de Sentimentos Multilíngue 🌍💬")

# Campo para o usuário digitar o texto que será analisado
texto = st.text_area("Digite o texto para análise de sentimento:")

# Quando o botão "Analisar" for clicado
if st.button("Analisar"):
    # Verifica se o usuário realmente digitou algo
    if texto:
        # Traduz o texto digitado para o inglês
        # Isso é necessário porque o modelo foi treinado em inglês
        traducao = translator.translate(texto, dest="en")
        texto
