
export default function Home() {
  return (
    <>
    <div className="container px-4 py-5">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div className="col-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png" 
            className="d-block mx-lg-auto img-fluig" width="700" height="500" 
            alt="Bitcoin Logo"
            />       
          </div>
          <div className="col-6">
            <h1 className="display-5 fw-bold lh-1 mb-3">Link Protegido</h1>
            <p className="lead">Este link está protegido pela Insert Coin.</p>
            <hr/>
            <p>Para acessar o conteúdo original, conecte sua carteira abaixo e confirme o pagamento da taxa de <strong>0 wei.</strong></p>
            <div className="row mb-3"> 
              <div className="col-6">
                <button type="button" className="btn btn-primary w-100 h-100">
                  <img src="/metamask.svg" alt="MetaMask Logo" width="32" className="me-1" />
                  Pagar e Acessar Link</button>
              </div>
            </div>
            <div className="alert alert-success p-3 col-12 mt-3" role="alert">Teste de mensagem</div>
          </div>
      </div>

    </div>
    </>
  );
}
