import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

interface faqsProps {}

export const Faqs: React.FC<faqsProps> = ({}) => {
  return (
    <section className="w-full max-w-7xl">
      <h2 className="text-center text-2xl font-bold">
        Häufig gestellte Fragen (FAQs)
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Accordion type="single" collapsible>
          <AccordionItem value="question1">
            <AccordionTrigger className="text-lg font-bold">
              Wie kann ich eine Bestellung aufgeben?
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-700">
                Um eine Bestellung aufzugeben, durchsuchen Sie einfach das
                aktuelle REWE-Angebot, fügen Sie Artikel zu Ihrem Warenkorb
                hinzu und gehen Sie zur Kasse.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="question2">
            <AccordionTrigger className="text-lg font-bold">
              Welche Zahlungsmethoden werden akzeptiert?
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-700">
                Wir akzeptieren verschiedene Zahlungsmethoden, darunter
                Kreditkarten, Debitkarten und mobile Wallets. In Kürze werden
                wir auch EBT/SNAP-Leistungen anbieten.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="question3">
            <AccordionTrigger className="text-lg font-bold">
              Gibt es Aktionen oder Rabatte?
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-700">
                Ja, wir bieten regelmäßig Aktionen und Rabatte an, wie z. B.
                kostenlose Lieferung bei Ihrer ersten Bestellung oder Rabatte
                auf ausgewählte Produkte. Überprüfen Sie unsere Website oder
                App, um die neuesten Angebote zu sehen.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="question4">
            <AccordionTrigger className="text-lg font-bold">
              Wie kann ich meine Bestellung verfolgen?
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-700">
                Sie können den Status Ihrer Bestellung über Ihr Konto auf
                unserer Website oder in der mobilen App verfolgen. Wir senden
                Ihnen auch Updates per E-Mail oder SMS, wenn Ihre Bestellung
                bearbeitet wird.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="question5">
            <AccordionTrigger className="text-lg font-bold">
              Wie lange dauert die Lieferung?
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-700">
                Die Lieferzeit hängt von Ihrer Standortverfügbarkeit und der
                gewählten Lieferzeit ab. In der Regel dauert die Lieferung
                zwischen 1 und 3 Stunden. Sie können bei der Bestellung ein
                bevorzugtes Lieferfenster auswählen.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="question6">
            <AccordionTrigger className="text-lg font-bold">
              Bieten Sie Abonnements oder Mitgliedschaften an?
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-700">
                Derzeit bieten wir keine Abonnements an, arbeiten jedoch an
                zukünftigen Mitgliedschaftsoptionen, die Vorteile wie kostenlose
                Lieferung und exklusive Rabatte beinhalten.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};
