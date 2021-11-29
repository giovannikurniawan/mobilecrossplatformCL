import {
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonTabs,
} from "@ionic/react";
import { happyOutline, sadOutline } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";

import GoodMemories from "./GoodMemories";
import BadMemories from "./BadMemories";
import NewMemory from "./NewMemory";

const Tabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet id="main">
        <Redirect exact path="/tabs" to="/tabs/goodmemories" />
        <Route exact path="/tabs/goodmemories" component={GoodMemories} />
        <Route exact path="/tabs/badmemories" component={BadMemories} />
        <Route exact path="/tabs/newmemory" component={NewMemory} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="mail" href="/tabs/goodmemories">
          <IonIcon icon={happyOutline} />
          <IonLabel>Good Memories</IonLabel>
        </IonTabButton>
        <IonTabButton tab="meet" href="/tabs/badmemories">
          <IonIcon icon={sadOutline} />
          <IonLabel>Bad Memories</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
