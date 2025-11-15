import face_recognition  # Biblioteca para reconhecimento facial
import os  # Biblioteca para manipulação de arquivos e diretórios

class FaceRecognitionService:
    def __init__(self, known_faces_dir):
        # Listas para armazenar as codificações faciais e os nomes correspondentes
        self.known_face_encodings = []
        self.known_face_names = []

        # Verifica se a pasta existe, se não, cria e avisa para adicionar imagens
        if not os.path.exists(known_faces_dir):
            os.makedirs(known_faces_dir)
            print(f"Pasta '{known_faces_dir}' criada. Por favor, adicione imagens para reconhecimento.")
            return  # Sai do método, pois não há imagens ainda

        # Carrega as imagens e codificações dos rostos conhecidos da pasta fornecida
        self.load_known_faces(known_faces_dir)

    def load_known_faces(self, folder):
        # Percorre todos os arquivos na pasta especificada
        for filename in os.listdir(folder):
            # Considera apenas arquivos de imagem com extensão jpg ou png
            if filename.endswith('.jpg') or filename.endswith('.png'):
                path = os.path.join(folder, filename)  # Caminho completo do arquivo
                image = face_recognition.load_image_file(path)  # Carrega a imagem
                encoding = face_recognition.face_encodings(image)  # Extrai as codificações faciais (vetores numéricos)
                if encoding:
                    # Se a codificação foi encontrada, armazena a codificação e o nome (nome do arquivo sem extensão)
                    self.known_face_encodings.append(encoding[0])
                    self.known_face_names.append(os.path.splitext(filename)[0])
        print(f"Carregados {len(self.known_face_encodings)} rostos conhecidos.")  # Exibe quantos rostos foram carregados

    def recognize(self, frame):
        # Recebe uma imagem (frame) em BGR (formato OpenCV) e converte para RGB (formato esperado pela lib)
        rgb_frame = frame[:, :, ::-1]

        # Detecta as posições dos rostos na imagem RGB
        face_locations = face_recognition.face_locations(rgb_frame)
        # Calcula as codificações faciais para cada rosto detectado
        face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

        recognized_faces = []  # Lista para armazenar os resultados do reconhecimento

        # Para cada codificação e sua respectiva localização na imagem
        for encoding, location in zip(face_encodings, face_locations):
            # Compara a codificação com as codificações dos rostos conhecidos
            matches = face_recognition.compare_faces(self.known_face_encodings, encoding)
            name = "Desconhecido"  # Valor padrão caso o rosto não seja reconhecido

            # Calcula as distâncias (similaridade) entre a codificação atual e as codificações conhecidas
            face_distances = face_recognition.face_distance(self.known_face_encodings, encoding)
            if len(face_distances) > 0:
                # Encontra o índice do rosto conhecido com a menor distância (mais parecido)
                best_match_index = face_distances.argmin()
                # Se esse rosto for um match verdadeiro, atribui o nome correspondente
                if matches[best_match_index]:
                    name = self.known_face_names[best_match_index]

            # Extrai as coordenadas da face detectada
            top, right, bottom, left = location
            # Adiciona um dicionário com nome e localização na lista de reconhecidos
            recognized_faces.append({
                "name": name,
                "location": {"top": top, "right": right, "bottom": bottom, "left": left}
            })

        # Retorna um dicionário com a lista de rostos reconhecidos e suas informações
        return {"faces": recognized_faces}
