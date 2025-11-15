import cv2
import os
import simpleaudio as sa
from datetime import datetime
import time

# === CONFIGURAÇÕES GERAIS ===

# Caminho base onde os rostos serão salvos (PASTA USADA PELO RECONHECIMENTO FACIAL)
PASTA_ROSTOS = r"D:\Users\Raquel\Desktop\projeto_obemtequer\backend\known_faces"

# Tempo limite (em horas) para manter imagens (usado na limpeza automática)
LIMITE_HORAS = 24
LIMITE_SEGUNDOS = LIMITE_HORAS * 60 * 60

# === CAPTURA DE ROSTOS === 

TOCAR_SOM = False  # Altere para True se quiser ativar o som


# Solicita o nome da pessoa (usado para nomear a subpasta)
nome_pessoa = input("Digite o nome da pessoa: ").strip().lower()

if not nome_pessoa:
    print("⚠️ Nome inválido. Encerrando.")
    exit()

# Cria a subpasta da pessoa
pasta_pessoa = os.path.join(PASTA_ROSTOS, nome_pessoa)
os.makedirs(pasta_pessoa, exist_ok=True)

# Carrega classificador Haar Cascade para detecção de rosto
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

# Função para encontrar câmera disponível
def encontrar_camera():
    for i in range(4):
        cap = cv2.VideoCapture(i)
        if cap.isOpened():
            print(f"📷 Câmera encontrada no índice {i}")
            return cap
        cap.release()
    return None

# Função para tocar o som de clique
def tocar_clique():
    if not TOCAR_SOM:
        return # Se o som estiver desativado, sai da função
    try:
        wave_obj = sa.WaveObject.from_wave_file("click.wav")
        play_obj = wave_obj.play()
        play_obj.wait_done()
    except Exception as e:
        print(f"⚠️ Erro ao tocar o som: {e}")

cap = encontrar_camera()
if cap is None:
    print("❌ Nenhuma câmera disponível. Verifique o cabo, permissões ou drivers.")
    exit()

print("🚨 Pressione 'S' para salvar um rosto 💾 ou 'Q' para sair ❌.")
contador = 0

while True:
    ret, frame = cap.read()
    if not ret:
        print("⚠️ Falha ao capturar imagem.")
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)

    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

    cv2.imshow("Captura de Rostos - O Bem Te Quer 💛", frame)

    tecla = cv2.waitKey(1) & 0xFF

    if tecla == ord('s'):
        if len(faces) == 0:
            print("⚠️ Nenhum rosto detectado para salvar.")
        else:
            for (x, y, w, h) in faces:
                rosto = frame[y:y + h, x:x + w]
                nome_arquivo = f"{nome_pessoa}_{contador}_{datetime.now().strftime('%Y%m%d%H%M%S')}.jpg"
                caminho_completo = os.path.join(pasta_pessoa, nome_arquivo)
                cv2.imwrite(caminho_completo, rosto)
                print(f"✅ Rosto salvo em: {caminho_completo}")
                tocar_clique()
                contador += 1

    elif tecla == ord('q'):
        print("🚪 Encerrando a captura...")
        break

cap.release()
cv2.destroyAllWindows()

# === LIMPEZA AUTOMÁTICA DE ROSTOS ANTIGOS ===

def limpar_imagens_antigas():
    agora = time.time()
    deletadas = 0

    if not os.path.exists(PASTA_ROSTOS):
        print(f"⚠️ Pasta não encontrada: {PASTA_ROSTOS}")
        return

    for pasta_nome in os.listdir(PASTA_ROSTOS):
        caminho_pasta = os.path.join(PASTA_ROSTOS, pasta_nome)

        if not os.path.isdir(caminho_pasta):
            continue

        for nome_arquivo in os.listdir(caminho_pasta):
            caminho_arquivo = os.path.join(caminho_pasta, nome_arquivo)

            if not nome_arquivo.lower().endswith(('.jpg', '.jpeg', '.png')):
                continue

            tempo_modificacao = os.path.getmtime(caminho_arquivo)
            tempo_passado = agora - tempo_modificacao
            data_modificacao = datetime.fromtimestamp(tempo_modificacao).strftime('%Y-%m-%d %H:%M:%S')

            print(f"📸 {nome_arquivo} | Modificado em: {data_modificacao} | {tempo_passado:.0f}s atrás")

            if tempo_passado > LIMITE_SEGUNDOS:
                try:
                    os.remove(caminho_arquivo)
                    print(f"🗑️ Removido: {caminho_arquivo}")
                    deletadas += 1
                except Exception as e:
                    print(f"❌ Erro ao deletar {caminho_arquivo}: {e}")

    if deletadas > 0:
        print(f"\n✅ {deletadas} imagem(ns) antigas foram removidas.")
    else:
        print("\n📂 Nenhuma imagem antiga para remover.")

if __name__ == "__main__":
    print("🧹 Iniciando limpeza automática...")
    limpar_imagens_antigas()
