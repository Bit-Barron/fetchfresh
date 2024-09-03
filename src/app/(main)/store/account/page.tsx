"use client";

import React from "react";
import { UserHook } from "@/components/hooks/user-hook";
import { SettingsSidebar } from "@/components/elements/settings/settingsidebar";
import { toast, Toaster } from "sonner";
import AccountInfoForm from "@/components/elements/account/account-info";
import AddressSummary from "@/components/elements/account/address-summary";
import PersonalInfoForm from "@/components/elements/account/personal-info";
import { User } from "@/types/account";

const Account: React.FC = () => {
  const { meQuery, updateUser } = UserHook();

  const handleUpdateUser = async (data: any) => {
    try {
      const updatedData = {
        ...data,
        username: meQuery.data?.username || data.username,
      };
      await updateUser.mutateAsync(updatedData);
      toast.success("Daten erfolgreich gespeichert");
    } catch (error) {
      toast.error(
        "Fehler beim Speichern, bitte versuchen Sie es später erneut"
      );
      console.error("Fehler beim Aktualisieren des Benutzers:", error);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <Toaster richColors position="top-right" />
      <SettingsSidebar />
      <div className="flex-1 p-6 md:p-10">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Kontoeinstellungen</h1>
        </div>
        <div className="grid gap-8">
          <AccountInfoForm
            user={meQuery.data as User}
            onUpdate={handleUpdateUser}
          />
          <PersonalInfoForm
            user={meQuery.data as User}
            onUpdate={handleUpdateUser}
          />

          <AddressSummary
            address={meQuery.data?.address as string}
            zipCode={meQuery.data?.zipCode as string}
          />
        </div>
      </div>
    </div>
  );
};

export default Account;
