import moment from 'moment';

export default function pickDate(context, date) {
  context('.date-input__display').click();

  context('.select-box-replacement--date-input').val(moment(date).format('YYYY-MM-DD'));

  context('.select-box-replacement--date-input').keyup();
}
