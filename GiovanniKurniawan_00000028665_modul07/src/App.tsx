import {
    IonApp, IonContent, IonHeader,
    IonIcon, IonItem,
    IonLabel,
    IonList, IonMenu, IonMenuToggle,
    IonPage,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs, IonTitle, IonToolbar
} from "@ionic/react";
import {IonReactRouter} from "@ionic/react-router";
import {Redirect, Route} from "react-router";
import Mail from "./pages/Mail";
import MailDetail from "./pages/MailDetail";
import {list, mailOutline, menu, settings, videocamOutline, warning} from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import {calculatorOutline, refreshOutline} from "ionicons/icons";
import {useRef, useState} from "react";
import MailTabs from "./pages/MailTabs";
import Settings from "./pages/Settings";
import FriendsContextProvider from "./data/FriendsContextProvider";


const App:React.FC = () => {
    return(
        <IonApp>
            <IonReactRouter>
                <IonMenu contentId="main">
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Ionic Mail</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonList>
                            <IonMenuToggle>
                                <IonItem button routerLink="/tabs/mail">
                                    <IonIcon slot="start" icon={list} />
                                    <IonLabel>All Mail</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                            <IonMenuToggle>
                                <IonItem button routerLink="/tabs/spam">
                                    <IonIcon slot="start" icon={warning} />
                                    <IonLabel>Spam</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                            <IonMenuToggle>
                                <IonItem button routerLink="/settings">
                                    <IonIcon slot="start" icon={settings} />
                                    <IonLabel>Settings</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        </IonList>
                        </IonContent>
                </IonMenu>
                <FriendsContextProvider>
                <IonRouterOutlet id="main">
                    <Route path="/tabs" component={MailTabs} />
                    <Route path="/mail/:mailId" component={MailDetail} />
                    <Route path="/settings" component={Settings} />
                    <Redirect exact from="/" to="/tabs" />
                </IonRouterOutlet>
                </FriendsContextProvider>
            </IonReactRouter>
        </IonApp>
    )
};

export default App;