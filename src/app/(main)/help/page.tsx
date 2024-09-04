import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/elements/home/footer";
import { UserHook } from "@/components/hooks/user-hook";

export default function Help() {
  const { meQuery } = UserHook();

  const faqs = [
    {
      question: "Wie kann ich mein Konto-Passwort ändern?",
      answer: (
        <ol className="list-inside list-decimal">
          <li>Melden Sie sich in Ihrem Konto an</li>
          <li>Gehen Sie zum Bereich Einstellungen oder Konto</li>
          <li>Suchen Sie die Passwort- oder Sicherheitseinstellungen</li>
          <li>Geben Sie Ihr aktuelles Passwort und ein neues Passwort ein</li>
          <li>
            Speichern Sie die Änderungen und Ihr Passwort wird aktualisiert
          </li>
        </ol>
      ),
    },
    {
      question: "Wie kann ich mein Abonnement kündigen?",
      answer: (
        <ol className="list-inside list-decimal">
          <li>Melden Sie sich in Ihrem Konto an</li>
          <li>Gehen Sie zum Bereich Abrechnung oder Abonnements</li>
          <li>Suchen Sie Ihr aktives Abonnement</li>
          <li>Klicken Sie auf die Schaltfläche Abbestellen oder Kündigen</li>
          <li>Bestätigen Sie die Kündigung und Ihr Abonnement wird beendet</li>
        </ol>
      ),
    },
    {
      question: "Wie kann ich meine Zahlungsinformationen aktualisieren?",
      answer: (
        <ol className="list-inside list-decimal">
          <li>Melden Sie sich in Ihrem Konto an</li>
          <li>Gehen Sie zum Bereich Abrechnung oder Abonnements</li>
          <li>Suchen Sie Ihr aktives Abonnement</li>
          <li>
            Klicken Sie auf die Schaltfläche Zahlungsinformationen aktualisieren
          </li>
          <li>
            Geben Sie Ihre neuen Zahlungsdetails ein und speichern Sie die
            Änderungen
          </li>
        </ol>
      ),
    },
    {
      question: "Wie kann ich mein Passwort zurücksetzen?",
      answer: (
        <ol className="list-inside list-decimal">
          <li>Gehen Sie zur Anmeldeseite</li>
          <li>Klicken Sie auf den Link Passwort vergessen</li>
          <li>
            Geben Sie Ihre E-Mail-Adresse ein und senden Sie das Formular ab
          </li>
          <li>
            Folgen Sie den Anweisungen in der E-Mail, um Ihr Passwort
            zurückzusetzen
          </li>
        </ol>
      ),
    },
    {
      question: "Wie kann ich meine E-Mail-Adresse ändern?",
      answer: (
        <ol className="list-inside list-decimal">
          <li>Melden Sie sich in Ihrem Konto an</li>
          <li>Gehen Sie zu den Konto- oder Profileinstellungen</li>
          <li>Aktualisieren Sie Ihre E-Mail-Adresse</li>
          <li>Speichern Sie die Änderungen</li>
          <li>
            Bestätigen Sie die Änderung durch die Verifizierungs-E-Mail, die an
            Ihre neue E-Mail-Adresse gesendet wird
          </li>
        </ol>
      ),
    },
  ];

  const helpCenterArticles = [
    {
      question: "Wie kann ich ein Benutzerkonto erstellen?",
      answer: (
        <ol className="list-inside list-decimal">
          <li>Gehen Sie zur Registrierungsseite</li>
          <li>Geben Sie Ihre persönlichen Daten ein</li>
          <li>Wählen Sie einen Benutzernamen und ein Passwort</li>
          <li>
            Bestätigen Sie Ihre Registrierung durch die Bestätigungs-E-Mail
          </li>
          <li>Nach der Bestätigung können Sie sich in Ihr Konto einloggen</li>
        </ol>
      ),
    },
    {
      question: "Wie kann ich meine Lieferadresse ändern?",
      answer: (
        <ol className="list-inside list-decimal">
          <li>Melden Sie sich in Ihrem Konto an</li>
          <li>Gehen Sie zu den Lieferadresseinstellungen</li>
          <li>Geben Sie die neue Lieferadresse ein</li>
          <li>Speichern Sie die Änderungen</li>
          <li>Bestätigen Sie die neue Adresse, falls erforderlich</li>
        </ol>
      ),
    },
    {
      question: "Wie kann ich eine Bestellung stornieren?",
      answer: (
        <ol className="list-inside list-decimal">
          <li>Melden Sie sich in Ihrem Konto an</li>
          <li>Gehen Sie zum Bereich Bestellungen</li>
          <li>Suchen Sie die Bestellung, die Sie stornieren möchten</li>
          <li>Klicken Sie auf die Schaltfläche Stornieren</li>
          <li>Bestätigen Sie die Stornierung</li>
        </ol>
      ),
    },
  ];

  return (
    <div>
      <div className="bg-background flex min-h-[100dvh] flex-col">
        <main className="container mx-auto flex-1 px-4 py-12 md:px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_400px]">
            <div>
              <h2 className="text-2xl font-bold">
                Hallo {meQuery.data?.username},
              </h2>
              <span className="text-xl font-bold">Wie können wir helfen?</span>
              <Accordion
                type="single"
                collapsible
                className="mt-10 space-y-4 bg-inputbg"
              >
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`question-${index}`}>
                    <AccordionTrigger className="bg-muted flex items-center justify-between rounded-md px-4 py-3">
                      <span className="font-medium">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="bg-muted text-muted-foreground rounded-md px-4 py-3">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <h1 className="mt-10 text-xl font-bold">Help Center Artikel</h1>
              <Accordion
                type="single"
                collapsible
                className="mt-6 space-y-4 bg-inputbg"
              >
                {helpCenterArticles.map((faq, index) => (
                  <AccordionItem key={index} value={`question-${index}`}>
                    <AccordionTrigger className="bg-muted flex items-center justify-between rounded-md px-4 py-3">
                      <span className="font-medium">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="bg-muted text-muted-foreground rounded-md px-4 py-3">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div>
              <h2 className="mb-6 text-xl font-bold">Kontaktieren Sie uns</h2>
              <Card className="p-6">
                <form className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Geben Sie Ihren Namen ein" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">E-Mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Geben Sie Ihre E-Mail-Adresse ein"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Nachricht</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      placeholder="Geben Sie Ihre Nachricht ein"
                    />
                  </div>
                  <Button type="submit" className="justify-self-end">
                    Abschicken
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </main>
        <footer className="border-t px-4 py-6 md:px-6">
          <div className="text-muted-foreground container mx-auto text-center">
            &copy; 2024 Ihr Unternehmen. Alle Rechte vorbehalten.
          </div>
        </footer>
      </div>
      <Footer />
    </div>
  );
}
