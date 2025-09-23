import React from "react";

export default function Termos() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Termos de Uso
            </h1>
            <p className="text-gray-600">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p>
              Bem-vindo ao Luan Digital! Ao acessar e usar nosso site, você concorda em cumprir os seguintes termos e condições.
            </p>

            <h2>1. Uso do Site</h2>
            <p>
              Você concorda em usar o site apenas para fins legais e de maneira que não infrinja os direitos de, restrinja ou iniba o uso e gozo do site por qualquer terceiro.
            </p>

            <h2>2. Conteúdo e Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo presente neste site, incluindo textos, gráficos, logos e imagens, é de propriedade de Luan Cardoso ou de seus parceiros de conteúdo e é protegido por leis de direitos autorais.
            </p>

            <h2>3. Links de Afiliados e Publicidade</h2>
            <p>
              Este site pode conter links de afiliados. Se você clicar em um link de afiliado e fizer uma compra, podemos receber uma comissão sem custo adicional para você. Também exibimos anúncios, que são fornecidos por redes de publicidade de terceiros.
            </p>

            <h2>4. Limitação de Responsabilidade</h2>
            <p>
              O conteúdo deste site é fornecido "como está", sem garantias de qualquer tipo. Não nos responsabilizamos por quaisquer perdas ou danos decorrentes do uso do nosso site.
            </p>

            <h2>5. Alterações nos Termos</h2>
            <p>
              Reservamo-nos o direito de alterar estes termos a qualquer momento. Quaisquer alterações entrarão em vigor imediatamente após a publicação no site.
            </p>
            
            <h2>6. Contato</h2>
            <p>
              Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco pelo e-mail luancr72024@gmail.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}