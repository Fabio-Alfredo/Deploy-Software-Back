import { useEffect } from "react";

const useSaveSessionOnUnload = ({ timeLeft, sessionState, user, patchPomodoroStateAndTime }) => {
    useEffect(() => {
        const handleBeforeUnload = async () => {
            if (!user?.token) return;

            try {
                const state = sessionState === 0 ? "work" : "break";
                const time = timeLeft
                await patchPomodoroStateAndTime({state, time },user.token);
            } catch (error) {
                console.error("Error al guardar el estado de la sesión:", error);
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [timeLeft, sessionState, user, patchPomodoroStateAndTime]);
};


export default useSaveSessionOnUnload;