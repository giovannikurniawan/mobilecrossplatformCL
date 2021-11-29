import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { Redirect } from "react-router";

const FloatingButton: React.FC = () => (
  <IonFab horizontal="end" vertical="bottom" slot="fixed">
    <IonFabButton color="secondary" routerLink="/tabs/newmemory">
      <IonIcon icon={addOutline} />
    </IonFabButton>
  </IonFab>
);

export default FloatingButton;
