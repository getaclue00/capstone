class AppointmentClientMandatory < ActiveRecord::Migration[5.0]
  def up
    change_column_null :appointments, :client_id, false
  end

  def down
    change_column_null :appointments, :client_id, true
  end
end
