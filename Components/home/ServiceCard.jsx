import React from "react";
import { ArrowRight } from "lucide-react";
import { SiteConfig } from "@/entities/SiteConfig";

export default function ServiceCard({ icon: Icon, title, description, features, color }) {
  const [siteConfig, setSiteConfig] = React.useState(null);

  React.useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const configs = await SiteConfig.list();
      if (configs.length > 0) {
        setSiteConfig(configs[0]);
      }
    } catch (error) {
      console.error("Erro ao carregar configurações:", error);
    }
  };

  return (
    <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      <div className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-7 h-7 text-white" />
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>

      <div className="space-y-2 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            <span className="text-gray-700 text-sm">{feature}</span>
          </div>
        ))}
      </div>

      {siteConfig?.whatsapp_url && (
        <a
          href={siteConfig.whatsapp_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors group-hover:gap-3"
        >
          Solicitar orçamento
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      )}
    </div>
  );
}