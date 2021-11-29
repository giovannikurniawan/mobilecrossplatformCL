import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonContent,
  IonHeader,
  IonPage,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import FloatingButton from "../components/FloatingButton";
import { useContext } from "react";
import MemoryContext from "../data/memoryContext";

const GoodMemories: React.FC = () => {
  const memoriesCtx = useContext(MemoryContext);
  const goodMemories = memoriesCtx.memories.filter(
    (memory) => memory.type === "good"
  );
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Good Memories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <FloatingButton />
        <IonGrid>
          {goodMemories.length === 0 && (
            <IonRow>
              <IonCol>
                <h2>Good Memories</h2>
              </IonCol>
            </IonRow>
          )}
          {goodMemories.map((memory) => (
            <IonRow key={memory.id}>
              <IonCol>
                <img src={memory.base64Url} alt={memory.title} />
                <IonCardHeader>
                  <IonCardTitle>{memory.title}</IonCardTitle>
                </IonCardHeader>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default GoodMemories;
