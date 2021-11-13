import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import {Redirect, Route} from "react-router";
import {happy, happyOutline, sad, sadOutline} from "ionicons/icons";
import BadMemories from "./BadMemories";
import GoodMemories from "./GoodMemories";
import NewMemory from "./NewMemory";

const MemoriesTabs: React.FC = () => {
    return(
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact path="/tabs" to="/tabs/goodmemories"/>
                <Route exact path="/tabs/goodmemories" component={GoodMemories}/>
                <Route exact path="/tabs/badmemories" component={BadMemories}/>
                <Route exact path="/tabs/newmemory" component={NewMemory}/>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="goodmemories" href="/tabs/goodmemories">
                    <IonIcon icon={happy}/>
                    <IonLabel>Good Memories</IonLabel>
                </IonTabButton>
                <IonTabButton tab="badmemories" href="/tabs/badmemories">
                    <IonIcon icon={sad}/>
                    <IonLabel>Bad Memories</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}

export default MemoriesTabs;