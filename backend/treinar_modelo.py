import os
import cv2
import face_recognition
import pickle

# Caminho da pasta onde os rostos foram salvos
PASTA_ROSTOS = "rostos"

# Listas para armazenar os rostos codificados e os nomes
rostos_codificados = []
nomes_dos_rostos = []

# Percorre cada pasta (nome da pessoa)
for nome in os.listdir(PASTA_ROSTOS):
    caminho_pessoa = os.path.join(PASTA_ROSTOS, nome)
    
    # Ignora se não for pasta
    if not os.path.isdir(caminho_pessoa):
        continue

    # Percorre cada imagem da pessoa
    for imagem_nome in os.listdir(caminho_pessoa):
        caminho_imagem = os.path.join(caminho_pessoa, imagem_nome)
        
        # Carrega a imagem e converte para RGB
        imagem = cv2.imread(caminho_imagem)
        imagem_rgb = cv2.cvtColor(imagem, cv2.COLOR_BGR2RGB)

        # Detecta e codifica o rosto
        faces = face_recognition.face_encodings(imagem_rgb)
        if len(faces) > 0:
            rosto_codificado = faces[0]
            rostos_codificados.append(rosto_codificado)
            nomes_dos_rostos.append(nome)
            print(f"[✔] Codificado rosto de: {nome}")
        else:
            print(f"[!] Nenhum rosto detectado em: {imagem_nome}")

# Salva os rostos codificados em um arquivo .pkl
with open("modelo_rostos.pkl", "wb") as f:
    pickle.dump((rostos_codificados, nomes_dos_rostos), f)

print("\n[✅] Treinamento concluído! Modelo salvo como 'modelo_rostos.pkl'")
