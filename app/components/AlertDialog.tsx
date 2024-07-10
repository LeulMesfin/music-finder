import { AlertDialog, Button, XStack, YStack } from 'tamagui';

export const AlertDialogBtn = ({ func }) => {
  return (
    <AlertDialog native>

      <AlertDialog.Trigger asChild>

        <Button themeInverse size="$6" width={200} minWidth={200}>Delete Account</Button>

      </AlertDialog.Trigger>
      <AlertDialog.Portal>

        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <AlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >

          <YStack space>

            <AlertDialog.Title>Delete your Account</AlertDialog.Title>

            <AlertDialog.Description>

              Are you sure you want to delete your account? This action cannot be undone.

            </AlertDialog.Description>
            <XStack space="$3" justifyContent="flex-end">

              <AlertDialog.Cancel asChild>

                <Button>Cancel</Button>

              </AlertDialog.Cancel>

              <AlertDialog.Action asChild onPress={() => {
                console.log("Delete button pressed");
                func();
                }}>
                <Button theme="active">Delete</Button> 

              </AlertDialog.Action>

            </XStack>

          </YStack>

        </AlertDialog.Content>

      </AlertDialog.Portal>

    </AlertDialog>
  )
}