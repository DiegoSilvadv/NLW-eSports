
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Activity, CheckCircle } from 'phosphor-react-native';
import { useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import { THEME } from '../../theme';
import { styles } from './styles';
import { Heading } from '../Heading';

interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}


export function DuoMatch({ discord, onClose, ...rest }: Props) {

    const [isCopping, setIsCopping] = useState(false);

    async function handleCopyDiscordToClipBoard() {
        setIsCopping(true);
        await Clipboard.setStringAsync(discord);
        Alert.alert('Discord copiado!', 'Usuario copiado para você colar no discord e encontrar a pessoa.')
        setIsCopping(false);
        
    }

    return (
        <Modal
            animationType='fade'
            transparent
            statusBarTranslucent
            {...rest}
        >
            <View style={styles.container}>
                <View style={styles.content}>

                    <TouchableOpacity style={styles.closeIcon}>
                        <MaterialIcons
                            onPress={onClose}
                            name="close"
                            size={20}
                            color={THEME.COLORS.CAPTION_500}
                        />
                    </TouchableOpacity>

                    <CheckCircle
                        size={64}
                        color={THEME.COLORS.SUCCESS}
                        weight="bold"
                    />
                    <Heading
                        title="Let's play!"
                        subtitle="Agora é só começar a jogar!"
                        style={{ alignItems: 'center', marginTop: 24 }}
                    />

                    <Text style={styles.label}>
                        Adicione seu discord
                    </Text>
                    
                    <TouchableOpacity
                        style={styles.discordButton}
                        onPress={handleCopyDiscordToClipBoard}
                        disabled={isCopping}
                    >
                        <Text style={styles.discord}>
                            {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

