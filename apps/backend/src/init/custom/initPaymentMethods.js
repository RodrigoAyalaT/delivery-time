import {initMethods} from "../../modules/payment/services/PaymentMethodService";
import winston from "winston";

export const initPaymentMethods = async function () {
    winston.info("Initializing payment methods...")
    try {
        let methods = await initMethods()
        winston.info("Payment methods id" + methods.id)
    } catch (e) {
        winston.error("Init Payment methods error ", e)
    }

    return
}
