import firebase from "../config";
import Cliente from "../../core/Cliente";
import ClienteRepositorio from "../../core/ClienteRepositorio";

export default class ColecaoCliente implements ClienteRepositorio {
  #conversor = {
    toFirestore(cliente: Cliente) {
      return {
        nome: cliente.nome,
        categoria: cliente.categoria,
        preco: cliente.preco,        
        id: cliente.id,
        // Adicionando a propriedade 'admin' com o ID do usuário logado
        admin: firebase.auth().currentUser.uid,
      };
    },
    fromFirestore(
      snapshot: firebase.firestore.QueryDocumentSnapshot,
      options: firebase.firestore.SnapshotOptions
    ): Cliente {
      const dados = snapshot.data(options);
      return new Cliente(dados.nome, dados.categoria, dados.preco, snapshot.id, dados.admin);
    },
  };

  async salvar(cliente: Cliente): Promise<Cliente> {
    if (cliente?.id) {
      await this.colecao().doc(cliente.id).set(cliente);
      return cliente;
    } else {
      const docRef = await this.colecao().add(cliente);
      const doc = await docRef.get();
      return doc.data();
    }
  }

  async excluir(cliente: Cliente): Promise<void> {
    return this.colecao().doc(cliente.id).delete();
  }
  
//   async obterTodos(): Promise<Cliente[]> {
//     // Obtendo o ID do usuário logado
//     const idUsuario = firebase.auth().currentUser?.uid;

//     // Realizando a consulta apenas para os clientes do usuário logado
//     if (idUsuario) {
//         const query = await this.colecao().where("admin", "==", idUsuario).get();
//         return query.docs.map(doc => doc.data()) ?? [];
//       }
//   }

async obterTodos(): Promise<Cliente[]> {
    // Função utilitária para obter o idUsuario de forma assíncrona
    const obterIdUsuario = async (): Promise<string | null> => {
      return new Promise((resolve) => {
        const cancelar = firebase.auth().onIdTokenChanged((usuario) => {
          const novoIdUsuario = usuario?.uid || null;
          resolve(novoIdUsuario);
        });
  
        return () => {
          if (cancelar) {
            cancelar();
          }
        };
      });
    };
  
    // Obtendo o ID do usuário logado de forma assíncrona
    const idUsuario = await obterIdUsuario();
  
    // Realizando a consulta apenas para os clientes do usuário logado
    if (idUsuario) {
      const query = await this.colecao().where("admin", "==", idUsuario).get();
      return query.docs.map((doc) => doc.data()) ?? [];
    }
  
    return [];
  }

  private colecao() {
    return firebase.firestore().collection("clientes").withConverter(this.#conversor);
  }
}