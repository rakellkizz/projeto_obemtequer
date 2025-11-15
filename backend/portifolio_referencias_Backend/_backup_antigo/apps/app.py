import streamlit as st
from transformers import pipeline
from deep_translator import GoogleTranslator  # Tradução multilíngue robusta

# --- CONFIGURAÇÕES DA PÁGINA E ESTILO VISUAL ---
st.set_page_config(
    page_title="Analisador Multilíngue de Sentimentos",
    layout="centered",
    initial_sidebar_state="auto"
)

# --- ESTILO PERSONALIZADO PARA CLAREZA VISUAL ---
st.markdown("""
    <style>
        html, body, [class*="css"] {
            background-color: white !important;
            color: black !important;
        }
        .stTextInput, .stTextArea, .stButton {
            background-color: white !important;
            color: black !important;
        }
    </style>
""", unsafe_allow_html=True)

# --- INICIALIZAÇÃO DO MODELO DE ANÁLISE DE SENTIMENTOS ---
analisador = pipeline("sentiment-analysis")  # Modelo pré-treinado da Hugging Face

# --- INTERFACE DO USUÁRIO ---
st.title("Analisador de Sentimentos Multilíngue 🌍💬")
st.write("Este app detecta o sentimento de qualquer texto em qualquer idioma.")

# Campo de entrada do texto
texto = st.text_area("Digite o texto para análise:")

# --- LÓGICA DE ANÁLISE ---
if st.button("Analisar"):
    if texto.strip():
        try:
            # Traduz automaticamente o texto para inglês (idioma do modelo)
            texto_em_ingles = GoogleTranslator(source='auto', target='en').translate(texto)

            # Executa a análise de sentimento
            resultado = analisador(texto_em_ingles)

            # --- EXIBIÇÃO DOS RESULTADOS ---
            st.markdown("### Resultado da Análise")
            st.write("🔍 **Texto original:**", texto)
            st.write("🔁 **Tradução para inglês:**", texto_em_ingles)
            st.write("📊 **Sentimento detectado:**", resultado[0]["label"])
            st.write("🔢 **Confiança:**", round(resultado[0]["score"] * 100, 2), "%")

        except Exception as e:
            st.error(f"Ocorreu um erro durante a análise: {str(e)}")
    else:
        st.warning("Por favor, digite um texto antes de analisar.")
