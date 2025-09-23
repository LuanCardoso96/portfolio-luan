
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { User } from "@/entities/User";
import { PaymentTransactions } from "@/entities/PaymentTransactions";
import { createPageUrl } from "@/utils";
import { ArrowRight, Copy, CreditCard, MessageSquare, Star, Zap, QrCode, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Assinatura() {
  const [currentUser, setCurrentUser] = useState(null);
  const [step, setStep] = useState(1); // 1: Formulário, 2: QR Code, 3: Confirmação
  const [userEmail, setUserEmail] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("pending");

  const pixKey = "11954682041";
  const price = 9.90;
  const whatsappUrl = "https://wa.me/5511960990726";

  useEffect(() => {
    checkUser();
  }, []);

  const checkPaymentStatus = useCallback(async () => {
    try {
      // Verificar status da transação
      const transactions = await PaymentTransactions.filter({
        transaction_id: transactionId
      });
      
      if (transactions.length > 0 && transactions[0].status === "approved") {
        setPaymentStatus("approved");
        setStep(4); // Página de sucesso
        
        // Atualizar usuário com nova data de expiração
        if (currentUser) {
          await User.updateMyUserData({
            membership_expires_at: transactions[0].membership_expires_at
          });
        }
      }
    } catch (error) {
      console.error("Erro ao verificar pagamento:", error);
    }
  }, [transactionId, currentUser]); // Adicionado currentUser como dependência

  useEffect(() => {
    if (step === 3 && transactionId) {
      // Simular verificação de pagamento a cada 5 segundos
      const interval = setInterval(() => {
        checkPaymentStatus();
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [step, transactionId, checkPaymentStatus]); // Adicionado checkPaymentStatus como dependência

  const checkUser = async () => {
    try {
      const user = await User.me();
      setCurrentUser(user);
      setUserEmail(user.email);
    } catch (error) {
      setCurrentUser(null);
    }
  };

  const generateQRCode = async () => {
    setIsLoading(true);
    
    try {
      // Gerar ID único para a transação
      const txId = `TX${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
      setTransactionId(txId);

      // Criar registro da transação
      const membershipExpires = new Date();
      membershipExpires.setMonth(membershipExpires.getMonth() + 1);

      await PaymentTransactions.create({
        user_email: userEmail,
        amount: price,
        pix_key: pixKey,
        transaction_id: txId,
        status: "pending",
        payment_date: new Date().toISOString(),
        membership_expires_at: membershipExpires.toISOString()
      });

      // Gerar QR Code PIX (usando API externa gratuita)
      const pixPayload = `00020126580014br.gov.bcb.pix0136${pixKey}52040000530398654${price.toFixed(2).replace('.', '')}5802BR5925Luan Digital Membership6009Sao Paulo62${(`05${txId}`).length.toString().padStart(2, '0')}${`05${txId}`}6304`;
      
      // Usar API pública para gerar QR Code
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(pixPayload)}`;
      setQrCodeUrl(qrUrl);
      
      setStep(2);
    } catch (error) {
      alert("Erro ao gerar QR Code: " + error.message);
    }
    
    setIsLoading(false);
  };

  const simulatePaymentApproval = async () => {
    // Função para simular aprovação (remover em produção)
    try {
      const transactions = await PaymentTransactions.filter({
        transaction_id: transactionId
      });
      
      if (transactions.length > 0) {
        await PaymentTransactions.update(transactions[0].id, {
          status: "approved"
        });
        
        setPaymentStatus("approved");
        setStep(4);
        
        if (currentUser) {
          const membershipExpires = new Date();
          membershipExpires.setMonth(membershipExpires.getMonth() + 1);
          
          await User.updateMyUserData({
            membership_expires_at: membershipExpires.toISOString()
          });
        }
      }
    } catch (error) {
      console.error("Erro ao simular aprovação:", error);
    }
  };

  const copyPixKey = () => {
    navigator.clipboard.writeText(pixKey);
    alert("Chave PIX copiada!");
  };

  const copyPixCode = () => {
    const pixPayload = `00020126580014br.gov.bcb.pix0136${pixKey}52040000530398654${price.toFixed(2).replace('.', '')}5802BR5925Luan Digital Membership6009Sao Paulo62${(`05${transactionId}`).length.toString().padStart(2, '0')}${`05${transactionId}`}6304`;
    navigator.clipboard.writeText(pixPayload);
    alert("Código PIX copiado!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Star className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Torne-se um <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Membro Exclusivo</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tenha acesso a conteúdos incríveis, tutoriais, apps exclusivos e downloads por apenas R$ {price.toFixed(2).replace('.', ',')}/mês.
          </p>
        </div>

        {/* Etapa 1: Formulário */}
        {step === 1 && (
          <Card className="shadow-2xl bg-white/80 backdrop-blur-md border-0 rounded-2xl">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefícios da Assinatura</h2>
                <ul className="space-y-4 mb-8">
                  {[
                    "📱 Apps mobile exclusivos",
                    "📚 Artigos e tutoriais premium",
                    "🎥 Vídeos e cursos exclusivos",
                    "💾 Downloads de materiais e templates",
                    "⚡ Acesso antecipado a novidades",
                    "💬 Suporte prioritário via WhatsApp"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <Zap className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 md:p-12 rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Plano Mensal</h2>
                <p className="flex items-baseline mb-6">
                  <span className="text-4xl font-extrabold tracking-tight">R$ {price.toFixed(2).replace('.', ',')}</span>
                  <span className="ml-1 text-xl font-semibold text-gray-500">/mês</span>
                </p>

                <div className="space-y-4">
                  {!currentUser && (
                    <div>
                      <Label htmlFor="email">Seu Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  )}
                  
                  <Button
                    onClick={generateQRCode}
                    disabled={isLoading || !userEmail}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-3"
                  >
                    {isLoading ? (
                      <>
                        <Clock className="w-5 h-5 mr-2 animate-spin" />
                        Gerando QR Code...
                      </>
                    ) : (
                      <>
                        <QrCode className="w-5 h-5 mr-2" />
                        Pagar com PIX
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    Pagamento seguro via PIX. Ativação imediata após confirmação.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Etapa 2: QR Code */}
        {step === 2 && (
          <Card className="shadow-2xl bg-white/80 backdrop-blur-md border-0 rounded-2xl max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Escaneie o QR Code para Pagar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="bg-white p-6 rounded-xl border-2 border-dashed border-purple-300">
                <img
                  src={qrCodeUrl}
                  alt="QR Code PIX"
                  className="mx-auto mb-4 rounded-lg shadow-lg"
                />
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  R$ {price.toFixed(2).replace('.', ',')}
                </p>
                <p className="text-sm text-gray-600">
                  ID da Transação: {transactionId}
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={copyPixCode}
                  variant="outline"
                  className="w-full"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Código PIX
                </Button>
                
                <div className="text-sm text-gray-600">
                  <p>Ou use a chave PIX:</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <code className="bg-gray-100 px-3 py-1 rounded">{pixKey}</code>
                    <Button size="sm" variant="ghost" onClick={copyPixKey}>
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setStep(3)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Já Paguei - Verificar Status
              </Button>

              {/* Botão temporário para simular aprovação */}
              <Button
                onClick={simulatePaymentApproval}
                variant="outline"
                className="w-full text-sm opacity-70"
              >
                🧪 Simular Aprovação (Demo)
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Etapa 3: Verificando Pagamento */}
        {step === 3 && paymentStatus === "pending" && (
          <Card className="shadow-2xl bg-white/80 backdrop-blur-md border-0 rounded-2xl max-w-2xl mx-auto">
            <CardContent className="text-center p-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-6"></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Verificando Pagamento...
              </h3>
              <p className="text-gray-600 mb-6">
                Aguarde enquanto confirmamos seu pagamento PIX. Isso pode levar alguns minutos.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>ID da Transação:</strong> {transactionId}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Etapa 4: Sucesso */}
        {step === 4 && paymentStatus === "approved" && (
          <Card className="shadow-2xl bg-white/80 backdrop-blur-md border-0 rounded-2xl max-w-2xl mx-auto">
            <CardContent className="text-center p-12">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                🎉 Pagamento Confirmado!
              </h3>
              <p className="text-gray-600 mb-6">
                Parabéns! Sua assinatura foi ativada com sucesso. Você agora tem acesso a todos os conteúdos exclusivos por 30 dias.
              </p>
              
              <div className="space-y-3">
                <Link to={createPageUrl("Membros")}>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-lg py-3">
                    <Star className="w-5 h-5 mr-2" />
                    Acessar Área de Membros
                  </Button>
                </Link>
                
                <Link to="/">
                  <Button variant="outline" className="w-full">
                    Voltar ao Início
                  </Button>
                </Link>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                Sua assinatura será renovada automaticamente a cada mês.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="text-center mt-8">
          <Link to={createPageUrl("Privacidade")} className="text-sm text-gray-500 hover:text-gray-700">
            Leia nossos termos e política de privacidade.
          </Link>
        </div>
      </div>
    </div>
  );
}
