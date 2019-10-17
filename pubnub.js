import PubNub from 'pubnub';

var pubnub = null;

export default () => {
    if (pubnub == null) {
        pubnub = new PubNub({
            subscribeKey: "sub-c-ff0c5120-7702-11e9-945c-2ea711aa6b65",
            publishKey: "pub-c-ab1f1896-d4ac-4b70-aaf4-ca968c88c2f5",
            secretKey: "sec-c-NjI1MjhlNDEtNmEwYi00NjNmLWJkYTgtNDYwNzFhZDBkNmQz",
            ssl: true,
            uuid: PubNub.generateUUID(),
        });

        pubnub.subscribe({
            channels: ["Queue"]
        });
    }

    return pubnub;
}
