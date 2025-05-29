import cv2
import os
from playsound import playsound
from datetime import datetime

# Caminho base onde os rostos serão salvos
PASTA_ROSTOS = r"D:\Users\Raquel\Desktop\projeto_obemtequer\backend\rostos_capturados"

# Solicita o nome da pessoa (usado para nomear a pasta)
nome_pessoa = input("Digite o nome da pessoa: ").strip().lower()

# Garante que o nome é válido
if not nome_pessoa:
    print("⚠️ Nome inválido. Encerrando.")
    exit()

# Cria o caminho da pasta da pessoa
pasta_pessoa = os.path.join(PASTA_ROSTOS, nome_pessoa)
os.makedirs(pasta_pessoa, exist_ok=True)

# Carrega o classificador Haar Cascade para detecção facial
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

# Função para encontrar uma câmera disponível
def encontrar_camera():
    for i in range(4):  # Testa índices de 0 a 3
        cap = cv2.VideoCapture(i)
        if cap.isOpened():
            print(f"📷 Câmera encontrada no índice {i}")
            return cap
        cap.release()
    return None

# Tenta abrir a câmera
cap = encontrar_camera()
if cap is None:
    print("❌ Nenhuma câmera disponível. Verifique o cabo, permissões ou drivers.")
    exit()

# Instruções para o usuário
print("🚨 Pressione 'S' para salvar um rosto 💾 ou 'Q' para sair ❌.")

contador = 0  # Contador de imagens salvas

while True:
    ret, frame = cap.read()
    if not ret:
        print("⚠️ Falha ao capturar imagem da câmera.")
        break

    # Converte para escala de cinza (melhor para detecção)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Detecta rostos na imagem
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)

    # Desenha retângulos verdes nos rostos detectados
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

    # Exibe a imagem com os rostos detectados
    cv2.imshow("Captura de Rostos - O Bem Te Quer 💛", frame)

    tecla = cv2.waitKey(1) & 0xFF

    if tecla == ord('s'):
        if len(faces) == 0:
            print("⚠️ Nenhum rosto detectado para salvar.")
        else:
            for (x, y, w, h) in faces:
                # Recorta apenas o rosto
                rosto = frame[y:y + h, x:x + w]

                # Cria nome de arquivo com data + contador
                nome_arquivo = f"{nome_pessoa}_{contador}_{datetime.now().strftime('%Y%m%d%H%M%S')}.jpg"
                caminho_completo = os.path.join(pasta_pessoa, nome_arquivo)

                # Salva a imagem do rosto
                cv2.imwrite(caminho_completo, rosto)
                print(f"✅ Rosto salvo em: {caminho_completo}")
                playsound("click.wav")
                contador += 1

    elif tecla == ord('q'):
        print("🚪 Encerrando a captura...")
        break

# Libera a câmera e fecha as janelas
cap.release()
cv2.destroyAllWindows()
# 📦 Importa bibliotecas essenciais
import os                             # Para trabalhar com arquivos e diretórios
import time                           # Para capturar o tempo atual em segundos (timestamp)
from datetime import datetime         # Para converter timestamps em datas legíveis
from datetime import timedelta        # (Não foi usado, mas pode ser útil para melhorias futuras)

# 🗂️ Caminho da pasta onde estão os rostos salvos
PASTA_ROSTOS = r"D:\Users\Raquel\Desktop\projeto_obemtequer\backend\rostos"

# ⏰ Tempo limite (em horas) para considerar uma imagem como "antiga"
LIMITE_HORAS = 24

# ⏱️ Converte o limite de horas para segundos (para facilitar a comparação com os timestamps)
LIMITE_SEGUNDOS = LIMITE_HORAS * 60 * 60

# 🔄 Função principal que realiza a limpeza de imagens antigas
def limpar_imagens_antigas():
    agora = time.time()         # 📌 Pega o tempo atual (em segundos desde 1970)
    deletadas = 0               # 🧮 Contador de quantas imagens foram removidas

    # 🔍 Verifica se a pasta principal existe
    if not os.path.exists(PASTA_ROSTOS):
        print(f"⚠️ Pasta não encontrada: {PASTA_ROSTOS}")
        return  # Encerra a função se a pasta não existir

    # 🗂️ Percorre todas as subpastas dentro da pasta principal
    for pasta_nome in os.listdir(PASTA_ROSTOS):
        caminho_pasta = os.path.join(PASTA_ROSTOS, pasta_nome)

        # ⚠️ Garante que seja uma pasta (e não um arquivo solto)
        if not os.path.isdir(caminho_pasta):
            continue

        # 🖼️ Dentro de cada subpasta, percorre todos os arquivos de imagem
        for nome_arquivo in os.listdir(caminho_pasta):
            caminho_arquivo = os.path.join(caminho_pasta, nome_arquivo)

            # 🎯 Verifica se é um arquivo de imagem com extensão válida
            if not nome_arquivo.lower().endswith(('.jpg', '.jpeg', '.png')):
                continue

            # 📆 Verifica a data da última modificação
            tempo_modificacao = os.path.getmtime(caminho_arquivo)
            tempo_passado = agora - tempo_modificacao
            data_modificacao = datetime.fromtimestamp(tempo_modificacao).strftime('%Y-%m-%d %H:%M:%S')

            # 🧪 Mostra informações úteis para debug
            print(f"📸 Arquivo: {nome_arquivo} | Modificado em: {data_modificacao} | Passado: {tempo_passado:.0f}s")

            # 🗑️ Remove o arquivo se ele for mais antigo que o limite
            if tempo_passado > LIMITE_SEGUNDOS:
                try:
                    os.remove(caminho_arquivo)
                    print(f"🗑️ Removido: {caminho_arquivo}")
                    deletadas += 1
                except Exception as e:
                    print(f"❌ Erro ao deletar {caminho_arquivo}: {e}")

    # ✅ Mensagem final após a varredura
    if deletadas > 0:
        print(f"\n✅ {deletadas} imagem(ns) antigas foram removidas com sucesso.")
    else:
        print("\n📂 Nenhuma imagem antiga para remover. Tudo limpo!")

# 🚀 Executa a função se este script for rodado diretamente
if __name__ == "__main__":
    print("🧹 Iniciando limpeza de imagens antigas...")
    limpar_imagens_antigas()
