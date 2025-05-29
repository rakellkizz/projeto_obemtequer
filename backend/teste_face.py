import face_recognition
import os

# 🗂️ Caminho para a pasta onde estão as imagens conhecidas da Raquel
pasta_raquel = "rostos/raquel"

# 📦 Lista para armazenar as codificações (representações) dos rostos encontrados
codificacoes_raquel = []

# 🔁 Percorre todos os arquivos dentro da pasta da Raquel
for arquivo in os.listdir(pasta_raquel):
    caminho_completo = os.path.join(pasta_raquel, arquivo)  # Caminho completo da imagem

    # 📸 Carrega a imagem do arquivo
    imagem = face_recognition.load_image_file(caminho_completo)

    # 🤖 Tenta encontrar e codificar o(s) rosto(s) na imagem
    codigos = face_recognition.face_encodings(imagem)
    if codigos:
        codificacoes_raquel.append(codigos[0])  # Armazena a primeira codificação encontrada
        print(f"✅ Rosto detectado em: {arquivo}")
    else:
        print(f"⚠️ Nenhum rosto detectado em: {arquivo}")

# 🚫 Se nenhuma codificação foi detectada, encerra o programa
if not codificacoes_raquel:
    print("❌ Nenhum rosto da Raquel foi codificado. Verifique as imagens.")
    exit()

# 🧪 Tentativa de carregar e analisar a imagem de teste (desconhecida)
try:
    imagem_teste = face_recognition.load_image_file("desconhecida.jpg")
    codificacao_teste = face_recognition.face_encodings(imagem_teste)

    # ❌ Se não detectar rosto na imagem de teste
    if not codificacao_teste:
        print("❌ Nenhum rosto encontrado na imagem desconhecida.")
        exit()

    # 🧬 Pega o primeiro rosto detectado na imagem de teste
    codificacao_teste = codificacao_teste[0]

    # 🔍 Compara o rosto da imagem de teste com todos os rostos conhecidos da Raquel
    resultado = face_recognition.compare_faces(codificacoes_raquel, codificacao_teste)

    # ✅ Se qualquer rosto for reconhecido, imprime sucesso
    if any(resultado):
        print("✅ Rosto reconhecido como Raquel!")
    else:
        print("❌ Rosto não reconhecido.")
        
# 🧯 Caso o arquivo da imagem de teste não exista
except FileNotFoundError:
    print("❌ Arquivo 'desconhecida.jpg' não encontrado. Verifique o nome ou caminho.")
