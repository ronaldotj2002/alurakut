import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
    <hr/>
    <p>
      <a className="boxLink" href={`https://gitHub.com/${propriedades.githubUser}`}>
        @{propriedades.githubUser}
      </a>
    </p>

    <hr/>
    <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const usuario = 'ronaldotj2002';
  const [comunidades, setComunidades] = React.useState([
    {
    id: '55454548784578',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
    link: 'https://www.orkut.br.com/MainCommunity?cmm=10000'
  },
  {
    id: '5545454878457833',
    title: 'Queria sorvete, mas era feijão',
    image: 'https://img10.orkut.br.com/community/5772468e52cea8b6dc2d07653185140b.jpg',
    link: 'https://www.orkut.br.com/MainCommunity?cmm=11200'
  },
  {
    id: 'so mais 5 minutinhos',
    title: 'Amo o frio',
    image: 'https://img10.orkut.br.com/community/b7b9c4e8f5232d204c58c32252ea321d.jpg',
    link: 'https://www.orkut.br.com/MainCommunity?cmm=69933'
  }
]);
  // const comunidades = ['Alurakut'];
  const pessoasFavoritas = [
    'omariosouto',
    'juunegreiros',
    'peas',
    'danieltugok',
    'denilson100',
    'ramonuchoa386',
    'flaviohenriquealmeida'
  ]
  return (
    <>
    <AlurakutMenu githubUser ={usuario}/>
    <MainGrid>

        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuario} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a) 
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosForm = new FormData(e.target);

              const comunidade = {
                id: new Date().toISOString(),
                title: dadosForm.get('title'),
                image: dadosForm.get('image'),
              }

              console.log("comunidades", comunidade)

              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas)
            }}>
              <div>
                <input
                placeholder="Qual vai ser o nome da sua comunidade?" 
                name="title" 
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text"
                />
              </div>

              <div>
                <input 
                placeholder="Coloque uma URL de imagem para usarmos de capa" 
                name="image" 
                aria-label="Coloque uma URL de imagem para usarmos de capa"
                type="text"
                />
              </div>
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.slice(0,6).map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`https://github.com/${itemAtual}`} target="_blank">
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
              <hr />
              <p className="ver-mais">Ver todos</p>
          </ProfileRelationsBoxWrapper>  
          
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
              <ul>
                {comunidades.slice(0,6).map((itemAtual) => {
                  return (
                    <li key={itemAtual.id}>
                      <a href={`${itemAtual.link}`} target="_blank">
                        <img src={itemAtual.image} />
                        <span>{itemAtual.title}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </ProfileRelationsBoxWrapper>
          
        </div>        
    </MainGrid>
    </>
  )
}
