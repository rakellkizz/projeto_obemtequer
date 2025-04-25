import customtkinter as ctk

ctk.set_appearance_mode("dark")  # "light", "dark", "system"
ctk.set_default_color_theme("blue")  # "blue", "green", "dark-blue"

janela = ctk.CTk()  # Janela principal
janela.geometry("400x300")
janela.title("O Bem Te Quer - Interface Principal")

botao = ctk.CTkButton(janela, text="Clique aqui!")
botao.pack(pady=20)

janela.mainloop()
