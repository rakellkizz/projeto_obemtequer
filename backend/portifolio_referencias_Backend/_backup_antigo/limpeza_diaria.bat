@echo off
:: 🔇 Oculta a exibição dos comandos no terminal

chcp 65001 >nul
:: 🌐 Define o encoding como UTF-8 (essencial para mostrar emojis e acentos corretamente)

echo 🧹 Iniciando limpeza de imagens antigas...
:: 📢 Mensagem de início da tarefa

:: 🐍 Executa o script Python responsável pela limpeza
:: ⚠️ Certifique-se de que os caminhos estejam corretos e atualizados
"C:\Users\Raquel\AppData\Local\Programs\Python\Python312\python.exe" "D:\Users\Raquel\Desktop\projeto_obemtequer\backend\limpar_imagens_antigas.py"

echo ✅ Limpeza finalizada.
:: 📢 Mensagem final indicando sucesso

pause
:: ⏸️ Mantém a janela do terminal aberta para o usuário ler as mensagens
