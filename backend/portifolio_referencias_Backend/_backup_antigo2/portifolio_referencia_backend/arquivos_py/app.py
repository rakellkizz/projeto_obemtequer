from flask import Flask, request, jsonify  # Importa o Flask e ferramentas para lidar com requisições e respostas JSON
import face_recognition  # Biblioteca para reconhecimento facial
import cv2  # OpenCV para manipulação de imagens
import numpy as np  # Biblioteca para manipulação eficiente de arrays
import os  # Biblioteca para interagir com o sistema de arquivos
from face_recognition_service import FaceRecognitionService  # Importa a classe que encapsula a lógica do reconhecimento facial

app = Flask(__name__)  # Cria uma aplicação Flask

# Inicializa o serviço de reconhecimento facial, carregando os rostos conhecidos da pasta "known_faces"
face_service = FaceRecognitionService(known_faces_dir="known_faces")

# Define uma rota HTTP POST chamada '/recognize' para receber imagens e reconhecer rostos nelas
@app.route('/recognize', methods=['POST'])
def recognize_face():
    # Verifica se a requisição contém um arquivo com o nome 'image'
    if 'image' not in request.files:
        # Se não tiver, retorna um erro 400 (Bad Request) com mensagem explicativa
        return jsonify({'error': 'No image provided'}), 400
    
    file = request.files['image']  # Recupera o arquivo da requisição

    # Converte o conteúdo do arquivo em um array NumPy de bytes
    npimg = np.frombuffer(file.read(), np.uint8)

    # Decodifica o array NumPy para uma imagem no formato BGR (formato padrão do OpenCV)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

    # Chama o método recognize do serviço, que processa a imagem para identificar rostos e retorna os resultados
    result = face_service.recognize(img)

    # Retorna o resultado em formato JSON para o cliente
    return jsonify(result)

# Ponto de entrada principal do programa
if __name__ == '__main__':
    # Executa a aplicação Flask em modo de debug (útil para desenvolvimento)
    app.run(debug=True)
