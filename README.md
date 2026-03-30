🏐 The Spike Cross - Wiki Database (WIP)
Este é um projeto de banco de dados interativo para o jogo The Spike Cross, focado em catalogar jogadores, habilidades, atributos e sistemas de ascensão. O objetivo é fornecer uma interface rápida e limpa para consulta de "meta" e lore dos personagens.

🧠 Desenvolvimento Assistido por IA (O Omni-Protocolo)
Seguindo a tendência de desenvolvimento moderno, este projeto utiliza uma abordagem de Co-Criação com Inteligência Artificial.

Como a IA é utilizada:
Assim como em projetos de grande escala (ex: King's Throne), a IA não substitui o desenvolvedor, mas atua como um multiplicador de força:

Arquitetura de Dados: A IA auxiliou na estruturação do data.json, garantindo que objetos complexos (como níveis de ascensão e arrays de habilidades) fossem escaláveis.

Snippets Customizados: Foram criados snippets de código específicos para o VS Code via IA, permitindo que a alimentação de dados de mais de 50 personagens seja feita com velocidade industrial e menos erros de sintaxe.

Tratamento de Imagens e OCR: Uso de modelos de visão para transcrever status diretamente de prints do jogo para o formato JSON.

Debug e Refatoração: Otimização de loops de renderização e correção de conflitos de cache e escopo em tempo real.

Nota: Cada linha de código e cada dado inserido passa por uma revisão humana rigorosa para garantir a fidelidade às mecânicas do jogo.

🚀 Funcionalidades Atuais
[x] Busca em Tempo Real: Filtro dinâmico por nome do jogador.

[x] Filtros por Categoria: Seleção por Rank (S+, S, S-) e Posição (WS, MB, SE).

[x] Sistema de Abas de Ascensão: Visualização dinâmica dos bônus de nível 0 a 5 sem recarregar a página.

[x] Galeria de Atributos: Grid visual com status de Ataque, Defesa, Velocidade e Salto.

[x] Cards Expansíveis: Interface limpa que revela detalhes extras apenas ao clique.

🛠️ Roadmap / Progresso (WIP)
O projeto está sendo alimentado manualmente para garantir precisão:

[ ] Wing Spikers (WS): 100% Concluído (Linha 1 ~ 845).

[ ] Middle Blockers (MB): Em progresso 🚧 (Linha 846+).

[ ] Setters (SE): Planejado.

[ ] Otimização de Assets: Implementação de placeholders para evitar erros 404 de imagens ausentes.

[ ]  **[FASE ATUAL] Consolidação de Dados:** Cadastro massivo de jogadores das classes WS (Concluído), MB (Em progresso) e SE.

[ ]  **Refatoração de Interface:** Melhorias no CSS para suporte a telas menores e placeholders de carregamento.

[ ]  **Engine de Tradução:** Implementação do script de tradução dinâmica sem redundância de dados.

## 🌍 Internacionalização & Acessibilidade (Planned)

Uma das prioridades do roadmap de UX é a implementação de um sistema de **Localização Dinâmica (i18n)**. 

* **Toggle de Idioma:** Um botão global permitirá alternar toda a interface, descrições de habilidades, resumos e detalhes de ascensão para o Inglês (EN).
* **Preservação de Identidade:** Seguindo o padrão oficial do jogo, os **nomes dos personagens** permanecerão inalterados independentemente do idioma selecionado, garantindo a consistência na busca e identificação.
* **Status:** Esta funcionalidade está planejada para ser implementada imediatamente após a conclusão do banco de dados completo (Linha 4000+ do `data.json`).



📈 Estatísticas do Código (Estimativa)
Atualmente o arquivo data.json conta com mais de 1000 linhas de dados estruturados, com previsão de ultrapassar 4000 linhas ao final do cadastro de todos os jogadores.

Como rodar o projeto localmente:

1- Clone o repositório.

2- Certifique-se de que o arquivo data.json está no mesmo diretório.

3- Use a extensão Live Server no VS Code para evitar problemas de CORS ao carregar o JSON localmente.
