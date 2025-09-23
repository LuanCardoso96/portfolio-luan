import React from "react";
import { Shield, Mail, Clock, FileText } from "lucide-react";

export default function Privacidade() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Política de Privacidade
            </h1>
            <p className="text-gray-600">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-600" />
                Informações Gerais
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações 
                pessoais quando você visita e interage com nosso site portfólio e aplicativo PWA.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Informações que Coletamos
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Informações Fornecidas Voluntariamente:</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Nome e informações de contato quando você preenche formulários</li>
                    <li>Mensagens enviadas através de nossos canais de comunicação</li>
                    <li>Preferências e interesses relacionados aos nossos serviços</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Informações Coletadas Automaticamente:</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Endereço IP e informações do dispositivo</li>
                    <li>Dados de navegação e interação com o site</li>
                    <li>Cookies e tecnologias similares para melhorar a experiência</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Como Usamos Suas Informações
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Responder às suas solicitações e fornecer suporte</li>
                <li>Personalizar e melhorar nossos serviços</li>
                <li>Enviar comunicações relevantes (com seu consentimento)</li>
                <li>Analisar o desempenho do site e identificar melhorias</li>
                <li>Cumprir obrigações legais quando necessário</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Cookies e Tecnologias Similares
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Utilizamos cookies essenciais para o funcionamento do site, cookies de performance 
                para análises (Google Analytics) e cookies de marketing para anúncios personalizados. 
                Você pode controlar suas preferências de cookies através das configurações do seu navegador.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Links de Afiliado e Publicidade
              </h2>
              <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Importante:</strong> Este site contém links de afiliado da Shopee e outros parceiros. 
                  Quando você clica nesses links e faz uma compra, podemos receber uma comissão sem custo 
                  adicional para você. Também exibimos anúncios através do Google AdSense que podem usar 
                  cookies para personalização.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Compartilhamento de Informações
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, 
                exceto nas seguintes situações:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Com fornecedores de serviços que nos ajudam a operar o site</li>
                <li>Quando exigido por lei ou para proteger nossos direitos</li>
                <li>Com seu consentimento explícito</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Seus Direitos (LGPD)
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Confirmação da existência de tratamento de dados pessoais</li>
                <li>Acesso aos seus dados pessoais</li>
                <li>Correção de dados incompletos, inexatos ou desatualizados</li>
                <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
                <li>Informação sobre compartilhamento de dados com terceiros</li>
                <li>Revogação do consentimento quando aplicável</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Segurança dos Dados
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Implementamos medidas de segurança técnicas e organizacionais adequadas para proteger 
                suas informações contra acesso não autorizado, alteração, divulgação ou destruição. 
                Isso inclui criptografia SSL, backups seguros e controle de acesso restrito.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Retenção de Dados
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Mantemos suas informações pessoais apenas pelo tempo necessário para os fins 
                descritos nesta política, ou conforme exigido por lei. Dados de analytics 
                são mantidos de forma agregada e anônima.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Alterações nesta Política
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Esta Política de Privacidade pode ser atualizada periodicamente. Notificaremos 
                sobre mudanças significativas através de nosso site ou outros meios apropriados.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Mail className="w-6 h-6 text-blue-600" />
                Entre em Contato
              </h2>
              <p className="text-gray-700 mb-4">
                Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato conosco:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> luancr72024@gmail.com</p>
                <p><strong>WhatsApp:</strong> <a href="https://wa.me/5511960990726" className="text-blue-600 hover:underline">(11) 96099-0726</a></p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span><strong>Tempo de resposta:</strong> Até 48 horas úteis</span>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}