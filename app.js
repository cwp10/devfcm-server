var FCM = require('fcm-node');

var serverKey = 'AAAA6WXzRhw:APA91bGFwpa6QHkxZ-I0X_BZb0tEXoXG2WNNsCvYuJfEGZ2cBIDLpDrBfXG0JI0hqrUAEV4YdAluU-nCzPObp8VioU7y0XmqbGCZX8PY-3FAZ9TYoXBAlEQWVIC4oWhv207q4mtH-rtg';
var client_token = 'fIHpPF5M-ds:APA91bFtM6xIumEOHXsH0hY37XzbNC9nqpdYzbxvmKWWDfQ9c3dOfiX7GhJMWROvZXl6igNMhSo60tyYGVoWsnCHBbN2S9k3-YFtCS4io-s6byqIGe-CvtLiFwFMMQUwxkHc8G9eC-Yr';

var push_data = {
  to: client_token,

  notification: {
    title: "FCM 테스트",
    body: "메시지가 잘가나요?",
    sound: "default",
    click_action: "FCM_PLUGIN_ACTIVITY",
    icon: "ic_noticifation"
  },

  priority: "high",

  restricted_package_name: "com.fcmtest.choiwp10.fcmtest",

  data: {
    title: "포어 그라운드 타이틀",
    body: "포어 그라운드 메시지"
  }
};

var fcm = new FCM(serverKey);

fcm.send(push_data, function (err, response) {
  if (err) {
    console.error('Push메시지 발송에 실패했습니다.');
    console.error(err);
    return;
  }

  console.log('Push메시지가 발송되었습니다.');
  console.log(response);
});