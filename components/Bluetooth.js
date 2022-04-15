import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import {BluetoothStatus} from 'react-native-bluetooth-status';
import {Buffer} from 'buffer';
import {BleManager} from 'react-native-ble-plx';
import {ActivityIndicator} from 'react-native';
import Colors from '../utils/Colors';
const manager = new BleManager();
import I18N from '../locale/i18n';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').width;
const Bluetooth = ({handleUpdate}) => {
  const [isScanning, setIsScanning] = useState(true);
  const [weight, setWeight] = useState(null);
  const [searchingDevice, setIsSearchingDevice] = useState(true);

  useEffect(async () => {
    setIsScanning(true);
    scanAndConnect();
  }, []);
  useEffect(() => {
    setIsScanning(false);
  }, [weight]);

  async function getBluetoothState() {
    const isEnabled = await BluetoothStatus.state();
    return isEnabled;
  }
  const MI_SCALE = 'MIBFS';
  const BODY_COMPOSITION_MEASUREMENT = '00002a9c-0000-1000-8000-00805f9b34fb';

  function getCharacteristics(device) {
    return new Promise(resolve => {
      device.services().then(services => {
        const characteristics = [];
        services.forEach(service => {
          service.characteristics().then(c => {
            characteristics.push(c);
            for (let i = 0; i < characteristics.length; i++) {
              for (const character of characteristics[i]) {
                if (character.uuid === BODY_COMPOSITION_MEASUREMENT) {
                  character.monitor((err, update) => {
                    if (err) {
                      console.log(JSON.stringify(err));
                      return;
                    } else {
                      const buffer = Buffer.from(update.value, 'base64');
                      const isStabilized =
                        buffer.toString('hex').slice(2, 4) === '26'
                          ? true
                          : false;

                      const weight_bytes = buffer.toString('hex').slice(22);

                      if (isStabilized) {
                        const weightInt =
                          Buffer.from(weight_bytes, 'hex').readInt16LE() / 200;
                        setWeight(weightInt);
                        resolve(weightInt);
                      }
                    }
                  });

                  return;
                }
              }
            }
          });
        });
      });
    });
  }

  const scanAndConnect = async () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        return;
      }
      setIsSearchingDevice(true);
      if (device.name === MI_SCALE) {
        setIsSearchingDevice(false);
        manager.stopDeviceScan();
        manager
          .connectToDevice(device.id)
          .then(device => {
            (async () => {
              const services =
                await device.discoverAllServicesAndCharacteristics();
              await getCharacteristics(services);
            })();
            return;
          })

          .then(
            () => {
              console.log('Listening...');
            },
            err => {
              console.log('Err' + JSON.stringify(err));
            },
          );
      }
    });
  };

  const renderSearching = () => {
    return (
      <>
        <ActivityIndicator size="large" color="blue" />
        <Text style={styles.searchInfo}>{I18N.t('deviceSearch')}</Text>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {searchingDevice && renderSearching()}
      <Text>{weight ? weight : null}</Text>
      {isScanning && <Text>scanning</Text>}
      {isScanning && <Text>scanning</Text>}
      {isScanning && <Text>{isScanning}</Text>}

      {weight && (
        <TouchableOpacity onPress={() => handleUpdate(weight, 0)}>
          <View style={styles.buttonStyle}>
            <Text style={styles.text}> {I18N.t('update')}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: SCREEN_HEIGHT * 0.2,
  },
  searchInfo: {
    marginTop: SCREEN_HEIGHT * 0.1,
    marginLeft: SCREEN_WIDTH * 0.3,
  },
  buttonStyle: {
    display: 'flex',
    backgroundColor: Colors.primaryColor2,
    color: Colors.white,
    marginTop: 80,
    width: SCREEN_WIDTH * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    height: SCREEN_HEIGHT * 0.06,
    borderRadius: 30,
    marginLeft: SCREEN_WIDTH * 0.2,
  },
  text: {
    color: Colors.white,
  },
});
export default Bluetooth;
