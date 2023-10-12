import Botao from '../components/Botao'
import Formulario from '../components/Formulario'
import Tabela from '../components/Tabela'
import Layout from '../components/template/Layout'
import LayoutConteudo from '../components/template/LayoutConteudo'
import useClientes from '../data/hook/useClientes'

export default function Home() {

  const { 
    cliente, 
    clientes, 
    novoCliente, 
    salvarCliente,
    selecionarCliente, 
    excluirCliente ,
    tabelaVisivel,
    exibirTabela
  } = useClientes()

  return (
    <Layout titulo="Página Inicial" subtitulo="Estamos construindo um template Admin!">
      <div className={`
        flex justify-center items-center h-full 
        bg-gray-200 dark:bg-gray-900 rounded-md border-1 border-gray-500
        text-white
      `}>
        <LayoutConteudo titulo="Cadastro simples">
          {tabelaVisivel ? (
            <>  
              <div className="flex justify-end">
                <Botao cor="green" className="mb-4" 
                  onClick={novoCliente}>
                  Novo produto
                </Botao>
              </div>          
              <Tabela 
                clientes={clientes} 
                clienteSelecionado={selecionarCliente}
                clienteExcluido={excluirCliente}
              />
            </>
          ) : (
            <Formulario 
              cliente={cliente} 
              clienteMudou={salvarCliente}
              cancelado={exibirTabela}
            />
          )} 
        </LayoutConteudo>  
      </div>
      
    </Layout>
  )
}
