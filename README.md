# Projeto do de seleção - Sistema para os gestores de uma concessionária

## RS CAR - Front-end

Esse projeto foi realizado como teste técnico em uma aplicação para vaga de desenvolvedor full stack.

Aplicação com o objetivo de disponibilizar aos administradores de uma consessionária (RS Car) possam gerir e controlar o seu negócio. 
Desde os carros, as vendas e os funcionários da empresa, os gráficos mostrar visualmente de forma clara os resultados. 

- [video de apresentação](https://youtu.be/dL-XaH6k4Jk)

## Requisitos

- NodeJs v16.15.1
- ReactJs

## Tecnologias usadas

- ReactJs
- ContextApi
- Date-fns
- React Google Charts
- Axios
- React-router-dom

## Funcionalidades

- Cadastrar, listar, editar e deletar um vendedor
- Cadastrar, listar, editar e deletar um veículo
- Cadastrar, listar, editar e deletar uma venda
- Card gráfico de quantidade de vendas no mês atual
- Card gráfico de quantidade de carros vendidos no mês atual
- Card gráfico da media de vendas no mês atual
- Gráfico de quantidade de total de vendas por funcionários em R$
- Gráfico de quantidade de vendas nos últimos meses
- Gráfico da media de vendas nos últimos meses

## Rodando localmente

#### clone o repositório

Usando chave ssh

```bash
git@github.com:rafael93souza/rs-car-front-end.git
```

Sem chave ssh

```bash
 https://github.com/rafael93souza/rs-car-front-end.git
```

### Entrar na pasta

```bash
  cd rs-car
```

Instalar as dependencias

```bash
  npm install
```

Start na aplicação

```bash
  npm start
```

Observação: Para rodar a aplicação front-end é preciso que a API de back-end esteja rodando. Seguir passos do repositório do [back-end](https://github.com/rafael93souza/rs-car-back-end).


### Aqui você poderá fazer login na aplicação

![](https://rs-car.s3.us-west-004.backblazeb2.com/images/imagem-login.png)

Usuário padrão para login
- email: admin@email.com
- senha: 123456

</br>

### Ao fazer login você chegará a página inicial da dashboard

![](https://rs-car.s3.us-west-004.backblazeb2.com/images/imagem-dashboard.png)

De inicio temos 3 Cards contendo Quantidade em R$ de vendas, quantidade de carros vendidos e a média de venda, todas referentes ao mês atual. 

###Mas abaixo você encontrará outros gráficos 

<img style="width:500px" src="https://rs-car.s3.us-west-004.backblazeb2.com/images/imagem-grafico-vendas-funcionario.png"/> <img style="width:500px" src="https://rs-car.s3.us-west-004.backblazeb2.com/images/imagem-grafico-vendas-meses.png"/>
Quantidade de vendas por vendedores em R$ / Quantidade de vendas nos ultimos meses em R$
</br>

<img style="width:500px" src="https://rs-car.s3.us-west-004.backblazeb2.com/images/imagem-grafico-vendas-carros.png"/> <img style="width:500px" src="https://rs-car.s3.us-west-004.backblazeb2.com/images/imagem-grafico-vendas-media.png"/>
Total de Carros vendidos nos ultimos meses / Media de vendas nos ultimos meses em R$ 



### Na página de carros da dashboard

Você encontra uma tabela contendo todos os carros cadastrados na empresa, os que estão com o código em vermelho, são os carros vendidos

![](https://rs-car.s3.us-west-004.backblazeb2.com/images/imagem-carros.png)

Você também pode cadastrar (clicando no botão adicionar carro), editar (clicando no icone de lapis na tabela e excluir um carro (clicando no icone de lixeira na tabela). OBS: Veiculos que foram vendidos, não poderão ser excluidos.

<img style="width:500px" src="https://rs-car.s3.us-west-004.backblazeb2.com/images/imagem-cadastro-carro.png"/> <img style="width:500px" src="https://rs-car.s3.us-west-004.backblazeb2.com/images/imagem-editar-carro.png"/>
Cadastrar Carro / Editar Carro
</br>


### Na página de vendas da dashboard

Você encontra uma tabela com todas as vendas cadastradas na empresa

![](https://rs-car.s3.us-west-004.backblazeb2.com/images/imagem-venda.png)

Você também pode Registrar uma venda (clicando no botão Registrar venda), editar (clicando no icone de lapis na tabela) e excluir uma venda (clicando no icone de lixeira na tabela)

<img style="width:500px" src="https://rs-car.s3.us-west-004.backblazeb2.com/images/imagem-cadastro-venda.png"/> <img style="width:500px" src="https://rs-car.s3.us-west-004.backblazeb2.com/images/imagem-editar-venda.png"/>
Registrar Venda / Editar venda
</br>




### Na página de vendedores da dashboard

Você encontra uma tabela com todos os vendedores cadastrados na empresa

![](https://rs-car.s3.us-west-004.backblazeb2.com/images/imagem-vendedores.png)

Você também pode Cadastrar um vendedor (clicando no botão Registrar vendedor), editar (clicando no icone de lapis na tabela) e excluir um vendedor (clicando no icone de lixeira na tabela)

<img style="width:500px" src="https://rs-car.s3.us-west-004.backblazeb2.com/images/imagem-cadastro-vendedor.png"/> <img style="width:500px" src="https://rs-car.s3.us-west-004.backblazeb2.com/images/imagem-editar-vendedor.png"/>
Registrar Vendedor / Editar vendedor
</br>


## Autor

- [@Rafael93souza](https://github.com/rafael93souza)
