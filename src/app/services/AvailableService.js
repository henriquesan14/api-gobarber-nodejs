import Appointment from '../models/Appointment';
import { startOfDay, endOfDay, setSeconds, setMinutes, setHours, format, isAfter } from 'date-fns';
import { Op } from 'sequelize';
import moment from 'moment';

class AvailableService {
    async run ({ provider_id, date  }){
        const appointments = await Appointment.findAll({
            where: {
                provider_id,
                canceled_at: null,
                date: {
                    [Op.between]: [startOfDay(date), endOfDay(date)]
                }
            }
        });

        const schedule = [
            '08:00',
            '09:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
            '19:00',
        ]

        const available = schedule.map(time => {
            const [hour, minute] = time.split(':');
            const value = setSeconds(setMinutes(setHours(date, hour), minute),0);
            
            const dataAtual = new Date();
            const dataMoment = moment(dataAtual);
            console.log(dataMoment);
            console.log(dataAtual);
            return {
                time,
                value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
                available:
                    isAfter(value, dataMoment) &&
                    !appointments.find(a =>
                        format(a.date, 'HH:mm') == time
                    )
            };
        });

        return available;
    }

}
export default new AvailableService();
