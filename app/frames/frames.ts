/* eslint-disable react/jsx-key */
import {openframes} from "frames.js/middleware";
import {createFrames} from "frames.js/next";
import {getLensFrameMessage, isLensFrameActionPayload} from "frames.js/lens";

interface MessageWithWalletAddressImplementation {
    walletAddress: () => Promise<string | undefined>;
}

export const frames = createFrames({
    basePath: "https://luis2.loclx.io/frames",
    middleware: [
        openframes({
            clientProtocol: {
                id: "lens",
                version: "1.0.0",
            },
            // clientProtocol: {
            //     id: "anonymous",
            //     version: "1.0.0",
            // },
            handler: {
                isValidPayload: (body) => isLensFrameActionPayload(body),
                getFrameMessage: async (body) => {
                    if (!isLensFrameActionPayload(body)) {
                        return body as unknown as MessageWithWalletAddressImplementation;
                    }
                    return {...await getLensFrameMessage(body)};
                },
            },
        }),
    ],
});
