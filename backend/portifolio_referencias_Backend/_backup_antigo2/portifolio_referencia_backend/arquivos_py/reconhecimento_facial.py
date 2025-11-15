import cv2
import os
import numpy as np
from datetime import datetime

# 🔍 Função para encontrar uma câmera conectada
def encontrar_camera():
    for i in range(4):
        cap = cv2.VideoCapture(i)
        if cap.isOpened():
            print(f'[✔] Câmera encontrada no índice {i}')
            return cap
        cap.release()
    return None

# 🧠 Função para extrair o rosto de um frame
def detectar_rosto(frame, face_cascade):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)
    if len(faces) == 0:
        return None
    x, y, w, h = faces[0]  # usa o primeiro rosto detectado
    rosto = frame[y:y+h, x:x+w]
    rosto = cv2.resize(rosto, (200, 200))
    return rosto

# 💬 Função (mock) para detectar emoção — substitua depois por modelo real
def detectar_emocao_mock(rosto_gray):
    # 👁️ Simulação básica: análise de intensidade da imagem
    media_pixel = np.mean(rosto_gray)
    if media_pixel > 150:
        return "Feliz"
    elif media_pixel < 80:
        return "Triste"
    else:
        return "Neutro"

# 📦 Carrega o classificador Haar Cascade
face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
)

# 👤 Nome do usuário
nome_usuario = input("👤 Digite seu nome de login (ex: raquel): ").strip().lower()

# 📁 Verifica se o diretório com rostos salvos existe
dir_usuario = os.path.join("rostos_capturados", nome_usuario)
if not os.path.exists(dir_usuario):
    print(f"[❌] Nenhum rosto cadastrado para '{nome_usuario}'.")
    exit()

# 🔍 Lê imagens salvas do usuário e converte para escala de cinza
rostos_salvos = []
for arquivo in os.listdir(dir_usuario):
    if arquivo.endswith(".png"):
        img = cv2.imread(os.path.join(dir_usuario, arquivo), cv2.IMREAD_GRAYSCALE)
        rostos_salvos.append(img)

if len(rostos_salvos) == 0:
    print(f"[⚠️] Nenhuma imagem de rosto encontrada em {dir_usuario}.")
    exit()

# 🟢 Inicia a câmera
cap = encontrar_camera()
if cap is None:
    print("[❌] Nenhuma câmera encontrada.")
    exit()

print("🟦 Posicione seu rosto para autenticação...")

# 🔁 Loop de captura até autenticar ou cancelar
autenticado = False
tentativas = 0
limite_tentativas = 5

while tentativas < limite_tentativas:
    ret, frame = cap.read()
    if not ret:
        print("[⚠️] Erro ao capturar imagem.")
        break

    rosto = detectar_rosto(frame, face_cascade)
    if rosto is None:
        print("[🤔] Nenhum rosto detectado. Tente novamente.")
        tentativas += 1
        continue

    # 🔳 Converte para tons de cinza para comparar
    rosto_gray = cv2.cvtColor(rosto, cv2.COLOR_BGR2GRAY)

    # 🔍 Compara com os rostos salvos
    for rosto_salvo in rostos_salvos:
        diff = cv2.absdiff(rosto_gray, rosto_salvo)
        erro = np.sum(diff) / 255  # soma dos pixels diferentes

        if erro < 10000:  # quanto menor, mais parecido (~ajustável)
            autenticado = True

            # 💾 Salva log de autenticação
            agora = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
            dir_log = os.path.join("usuarios_autenticados", nome_usuario)
            os.makedirs(dir_log, exist_ok=True)
            caminho_imagem = os.path.join(dir_log, f"acesso_{agora}.png")
            cv2.imwrite(caminho_imagem, rosto)
            print(f"[📸] Foto salva em: {caminho_imagem}")

            # 😊 Detecta emoção (mock)
            emocao = detectar_emocao_mock(rosto_gray)
            print(f"[😊] Emoção detectada: {emocao}")

            # ✅ Confirmação
            print(f"[✅] Autenticado com sucesso como '{nome_usuario}'!")
            break

    if autenticado:
        break

    print(f"[❌] Rosto não reconhecido. Tentativas restantes: {limite_tentativas - tentativas - 1}")
    tentativas += 1

# 🧹 Finaliza
cap.release()
cv2.destroyAllWindows()

if not autenticado:
    print("[🔒] Acesso negado. Número de tentativas excedido.")
