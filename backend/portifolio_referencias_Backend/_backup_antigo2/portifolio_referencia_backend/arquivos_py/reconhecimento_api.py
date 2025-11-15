# --- Importações de bibliotecas necessárias ---
from flask import Flask, request, jsonify              # Flask para criar API HTTP
from flask_cors import CORS                            # CORS para permitir requisições entre domínios
import face_recognition                                # Biblioteca poderosa para reconhecimento facial
import cv2                                             # OpenCV para processamento de imagem
import numpy as np                                     # NumPy para manipulação eficiente de arrays
import os                                              # OS para lidar com arquivos e diretórios
from datetime import datetime                          # Para marcação de hora se necessário no futuro

# --- Inicializa a aplicação Flask ---
app = Flask(__name__)
CORS(app)  # Permite requisições CORS de qualquer origem (ajuste conforme necessidade)

# --- Diretório onde ficam armazenadas as imagens dos usuários autorizados ---
KNOWN_FACES_DIR = "rostos_autorizados"

# Listas para armazenar os *encodings* (assinaturas) e nomes dos usuários autorizados
known_faces_encodings = []
known_names = []

# --- Carregamento automático de rostos autorizados ao iniciar a API ---
for filename in os.listdir(KNOWN_FACES_DIR):
    if filename.endswith(".jpg") or filename.endswith(".png"):
        caminho_arquivo = os.path.join(KNOWN_FACES_DIR, filename)
        image = face_recognition.load_image_file(caminho_arquivo)

        # Extrai o encoding (representação vetorial do rosto)
        encodings = face_recognition.face_encodings(image)

        if encodings:
            known_faces_encodings.append(encodings[0])                     # Armazena o encoding do rosto
            nome_usuario = os.path.splitext(filename)[0].lower().strip()  # Nome sem extensão, normalizado
            known_names.append(nome_usuario)
            print(f"[✔] Rosto carregado: {nome_usuario}")
        else:
            print(f"[⚠️] Nenhum rosto detectado na imagem: {filename}")

# --- Rota principal para teste da API ---
@app.route("/")
def home():
    return jsonify({"status": "API de reconhecimento facial rodando"}), 200

# --- Rota para autenticação facial via POST ---
@app.route("/login-facial", methods=["POST"])
def login_facial():
    if "imagem" not in request.files:
        return jsonify({"erro": "Imagem não fornecida"}), 400

    # Lê o conteúdo binário da imagem enviada
    file = request.files["imagem"]
    img_np = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(img_np, cv2.IMREAD_COLOR)

    if img is None:
        return jsonify({"erro": "Imagem inválida"}), 400

    # Converte de BGR (padrão OpenCV) para RGB (padrão face_recognition)
    rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Extrai os encodings dos rostos detectados
    faces_encodings = face_recognition.face_encodings(rgb_img)

    if not faces_encodings:
        return jsonify({"erro": "Nenhum rosto detectado"}), 400

    # Considera o primeiro rosto detectado
    face_encoding = faces_encodings[0]

    # Compara com os rostos autorizados
    matches = face_recognition.compare_faces(known_faces_encodings, face_encoding, tolerance=0.5)
    face_distances = face_recognition.face_distance(known_faces_encodings, face_encoding)

    if True in matches:
        # Seleciona o índice do rosto mais próximo (menor distância)
        best_match_index = np.argmin(face_distances)
        nome = known_names[best_match_index]
        print(f"[✅] Login aprovado para: {nome}")
        return jsonify({"login": "aprovado", "usuario": nome}), 200
    else:
        print("[❌] Rosto não reconhecido.")
        return jsonify({"login": "negado"}), 401

# --- Executa a API localmente na porta 5001 ---
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
