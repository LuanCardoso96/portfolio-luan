import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, PlusCircle, CheckCircle, XCircle } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const allUsers = await User.list();
      setUsers(allUsers);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
    setIsLoading(false);
  };

  const addOneMonth = async (user) => {
    const currentExpiry = user.membership_expires_at && new Date(user.membership_expires_at) > new Date()
      ? new Date(user.membership_expires_at)
      : new Date();
      
    const newExpiryDate = new Date(currentExpiry.setMonth(currentExpiry.getMonth() + 1));

    try {
      await User.update(user.id, { membership_expires_at: newExpiryDate.toISOString() });
      alert(`Assinatura de ${user.full_name} estendida até ${format(newExpiryDate, "dd/MM/yyyy")}!`);
      loadUsers();
    } catch (error) {
      alert("Erro ao atualizar assinatura: " + error.message);
    }
  };

  const getMembershipStatus = (expiresAt) => {
    if (expiresAt && new Date(expiresAt) > new Date()) {
      return (
        <Badge className="bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Ativa até {format(new Date(expiresAt), "dd/MM/yy")}
        </Badge>
      );
    }
    return (
      <Badge variant="destructive">
        <XCircle className="w-3 h-3 mr-1" />
        Inativa
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Gerenciamento de Usuários
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Carregando usuários...</p>
        ) : (
          <div className="space-y-4">
            {users.map(user => (
              <div key={user.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="mb-2 sm:mb-0">
                  <h4 className="font-medium">{user.full_name || "Usuário sem nome"}</h4>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Cadastrado {formatDistanceToNow(new Date(user.created_date), { locale: ptBR, addSuffix: true })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {getMembershipStatus(user.membership_expires_at)}
                  <Button onClick={() => addOneMonth(user)} size="sm">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    +1 Mês
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}