# 🐍 Importa bibliotecas essenciais
import os                             # Para trabalhar com arquivos e diretórios
import time                           # Para lidar com marcação de tempo (timestamp)
from datetime import datetime         # Para converter timestamps em datas legíveis

# 🔧 Caminho onde estão armazenadas as subpastas com as imagens (rostos)
PASTA_ROSTOS = r"D:\Users\Raquel\Desktop\projeto_obemtequer\backend\rostos_capturados"

# 📄 Caminho do log de remoção
CAMINHO_LOG = os.path.join(PASTA_ROSTOS, "log_limpeza.txt")

# ⏰ Tempo limite (em horas) para considerar uma imagem como "antiga"
LIMITE_HORAS = 0.001  # Cerca de 3.6 segundos (ajuste para 24 no uso real)

# ⏱️ Converte o limite de horas para segundos
LIMITE_SEGUNDOS = LIMITE_HORAS * 60 * 60  # 24h * 60min * 60seg = 86400 segundos

# 🔄 Função principal que faz a limpeza das imagens antigas
def limpar_imagens_antigas():
    agora = time.time()         # 📌 Pega o tempo atual (em segundos desde 1970, formato timestamp)
    deletadas = 0               # 🧮 Conta quantas imagens foram removidas
    log_linhas = []             # 🧾 Lista que armazenará entradas de log

    # 🔍 Verifica se a pasta principal existe
    if not os.path.exists(PASTA_ROSTOS):
        print(f"⚠️ Pasta não encontrada: {PASTA_ROSTOS}")
        return  # Encerra a função se a pasta base não existir

    print(f"\n📁 Pasta principal: {PASTA_ROSTOS}")

    # 🔹 1. Verifica imagens diretamente na pasta principal (sem subpastas)
    print(f"\n📂 Verificando imagens na raiz da pasta...")
    for nome_arquivo in os.listdir(PASTA_ROSTOS):
        caminho_arquivo = os.path.join(PASTA_ROSTOS, nome_arquivo)

        if not os.path.isfile(caminho_arquivo):
            continue  # Pula diretórios

        if not nome_arquivo.lower().endswith(('.jpg', '.jpeg', '.png')):
            continue  # Pula se não for imagem

        try:
            tempo_modificacao = os.path.getmtime(caminho_arquivo)
            tempo_passado = agora - tempo_modificacao
            data_modificacao = datetime.fromtimestamp(tempo_modificacao).strftime('%Y-%m-%d %H:%M:%S')

            print(f"  📸 {nome_arquivo} | 🕓 Modificado: {data_modificacao} | ⏱️ Passado: {tempo_passado:.0f}s")

            if tempo_passado > LIMITE_SEGUNDOS:
                os.remove(caminho_arquivo)
                print(f"    🗑️ Removido com sucesso.")
                deletadas += 1
                log_linhas.append(f"🗑️ {nome_arquivo} | Modificado em: {data_modificacao}\n")

        except Exception as e:
            print(f"❌ Erro ao processar '{nome_arquivo}': {e}")

    # 🔹 2. Percorre todas as subpastas dentro da pasta principal
    for pasta_nome in os.listdir(PASTA_ROSTOS):
        caminho_pasta = os.path.join(PASTA_ROSTOS, pasta_nome)  # Monta o caminho completo da subpasta

        if not os.path.isdir(caminho_pasta):
            continue  # Pula se não for pasta

        print(f"\n🔎 Verificando subpasta: {pasta_nome}")

        for nome_arquivo in os.listdir(caminho_pasta):
            caminho_arquivo = os.path.join(caminho_pasta, nome_arquivo)

            if not nome_arquivo.lower().endswith(('.jpg', '.jpeg', '.png')):
                continue  # Pula se não for imagem

            try:
                tempo_modificacao = os.path.getmtime(caminho_arquivo)
                tempo_passado = agora - tempo_modificacao
                data_modificacao = datetime.fromtimestamp(tempo_modificacao).strftime('%Y-%m-%d %H:%M:%S')

                print(f"  📸 {nome_arquivo} | 🕓 Modificado: {data_modificacao} | ⏱️ Passado: {tempo_passado:.0f}s")

                if tempo_passado > LIMITE_SEGUNDOS:
                    os.remove(caminho_arquivo)
                    print(f"    🗑️ Removido com sucesso.")
                    deletadas += 1
                    log_linhas.append(f"🗑️ {nome_arquivo} (subpasta: {pasta_nome}) | Modificado em: {data_modificacao}\n")

            except Exception as e:
                print(f"❌ Erro ao processar '{nome_arquivo}': {e}")

    # 🧾 Se houve arquivos deletados, salva o log em arquivo
    if deletadas > 0:
        with open(CAMINHO_LOG, 'a', encoding='utf-8') as log:
            log.write(f"\n🕓 Execução em {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            log.writelines(log_linhas)

        print(f"\n✅ {deletadas} imagem(ns) antigas foram removidas com sucesso.")
        print(f"📝 Log salvo em: {CAMINHO_LOG}")
    else:
        print("\n📂 Nenhuma imagem antiga para remover. Tudo limpo!")

# 🚀 Executa a função se este script for rodado diretamente
if __name__ == "__main__":
    print("🧹 Iniciando limpeza de imagens antigas...")
    limpar_imagens_antigas()
