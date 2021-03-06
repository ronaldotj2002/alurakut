import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
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

export default function Home(props) {
  const usuario = props.githubUser;
  const [comunidades, setComunidades] = React.useState([]);
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
  const [seguidores, setSeguidores] = React.useState([]);
  React.useEffect(function() {
    fetch('https://api.github.com/users/peas/followers')
      .then(function (respostaServidor) {
        return respostaServidor.json();
      })
      .then(function(respostaCompleta) {
        setSeguidores(respostaCompleta);
      })

      // GraphQL
      fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
          'Authorization': 'd70585ebe09ffe952564629401a53a',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ "query": `query {
          allComunidades {
            id
            title
            imageUrl
            link
            creatorSlug
          }
        }` 
        })
      })
      .then((response) => response.json())
      .then((respostaCompleta) =>  {
        const allComunidades = respostaCompleta.data.allComunidades
        
        setComunidades(allComunidades)
      })

  }, [])

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
            <h2 className="subTitle">O que voc?? deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosForm = new FormData(e.target);

              const comunidade = {
                title: dadosForm.get('title'),
                imageUrl: dadosForm.get('image'),
                link: dadosForm.get('link'),
                creatorSlug: usuario
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json()
                
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas)
              })

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

              <div>
                <input 
                placeholder="Coloque uma URL da comunidade" 
                name="link" 
                aria-label="Coloque uma URL da comunidade"
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
                        <img src={itemAtual.imageUrl} />
                        <span>{itemAtual.title}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
              <hr />
              <p className="ver-mais">Ver todos</p>
            </ProfileRelationsBoxWrapper>
          
        </div>        
    </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;  
  const { isAuthenticated } = await fetch("https://alurakut-ronaldotj2002.vercel.app/api/auth", {
    headers: {
      Authorization: token,
    },
  })
  .then((resposta) => resposta.json())
  
  
  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  const { githubUser } = jwt.decode(token)
  return {
    props: {
      githubUser
    },
  }
}
