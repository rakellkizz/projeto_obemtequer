import tkinter as tk
from tkinter import ttk
from googletrans import Translator

def traduzir_texto():
    texto = entrada.get("1.0", tk.END).strip()
    idioma_destino = idiomas[combo_idiomas.get()]
    
    if texto:
        resultado = tradutor.translate(texto, dest=idioma_destino)
        saida["text"] = resultado.text
    else:
        saida["text"] = "Digite algo para traduzir."

# Mapeamento dos idiomas
idiomas = {
    "Português": "pt",
    "Inglês": "en",
    "Espanhol": "es",
    "Francês": "fr",
    "Alemão": "de",
    "Italiano": "it",
    "Japonês": "ja",
    "Chinês": "zh-cn"
}

# Instancia tradutor
tradutor = Translator()

# Print para verificar se o código chega até a criação da janela
print("Iniciando a interface...")

# Interface Gráfica
janela = tk.Tk()
janela.title("Tradutor Multilíngue")
janela.geometry("500x300")

# Entrada de texto
tk.Label(janela, text="Digite o texto:", font=("Arial", 12)).pack(pady=5)
entrada = tk.Text(janela, height=5, width=50)
entrada.pack()

# Escolher idioma
tk.Label(janela, text="Traduzir para:", font=("Arial", 12)).pack(pady=5)
combo_idiomas = ttk.Combobox(janela, values=list(idiomas.keys()))
combo_idiomas.set("Inglês")  # padrão
combo_idiomas.pack()

# Botão Traduzir
tk.Button(janela, text="Traduzir", command=traduzir_texto).pack(pady=10)

# Resultado
saida = tk.Label(janela, text="", wraplength=450, font=("Arial", 12), fg="green")
saida.pack()

# Inicia a interface
janela.mainloop()
