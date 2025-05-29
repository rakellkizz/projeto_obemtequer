import cv2
import os
from datetime import datetime

# Função para tentar abrir a webcam em vários índices diferentes
def encontrar_camera():
    """
    Tenta abrir a webcam nos índices de 0 a 3.
    Retorna o objeto VideoCapture se conseguir abrir alguma câmera,
    ou None se nenhuma câmera for encontrada.
    """
    for i in range(4):
        cap = cv2.VideoCapture(i)
        if cap.isOpened():
            print(f'[✔] Câmera encontrada no índice {i}')
            return cap
        cap.release()
    return None

# Cria uma pasta para salvar os rostos, se ainda não existir
output_dir = "rostos_capturados"
os.makedirs(output_dir, exist_ok=True)

# Carrega o classificador Haar Cascade para detecção de faces
face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
)

# Tenta abrir a câmera
cap = encontrar_camera()

# Se não encontrar nenhuma câmera, exibe aviso e encerra
if cap is None:
    print("[❌] Nenhuma câmera encontrada. Verifique conexão e permissões.")
    exit()

print("📸 Pressione 's' para salvar imagem | 'q' para sair")

# Loop principal
while True:
    ret, frame = cap.read()
    if not ret:
        print("[⚠️] Falha ao capturar o frame da câmera.")
        break

    # Converte o frame para tons de cinza
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Detecta rostos no frame
    faces = face_cascade.detectMultiScale(
        gray, scaleFactor=1.3, minNeighbors=5
    )

    # Desenha retângulos ao redor dos rostos detectados
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

    # Exibe o vídeo com as detecções
    cv2.imshow('Reconhecimento Facial - O Bem Te Quer 💛', frame)

    # Verifica a tecla pressionada
    key = cv2.waitKey(1) & 0xFF

    if key == ord('q'):
        print("[⏹] Encerrando...")
        break
    elif key == ord('s'):
        # Salva o frame com timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{output_dir}/rosto_{timestamp}.png"
        cv2.imwrite(filename, frame)
        print(f"[📁] Imagem salva com sucesso: {filename}")

# Libera recursos
cap.release()
cv2.destroyAllWindows()
