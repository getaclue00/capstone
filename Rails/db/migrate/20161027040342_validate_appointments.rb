class ValidateAppointments < ActiveRecord::Migration[5.0]
   def up
  	#note: model contains additionnal checks

 	change_column :appointments, :color, :string, default: '#AB00FF'
 	change_column_null :appointments, :color, false

 	change_column :appointments, :text_color, :string, default: '#FFFFFF'
 	change_column_null :appointments, :text_color, false

    change_column :appointments, :title, :string, default: 'New Appointment'
    change_column_null :appointments, :title, false

    change_column :appointments, :start, :datetime, default: '2016-10-23T09:10'
    change_column_null :appointments, :start, false

    change_column :appointments, :end, :datetime, default: '2016-12-31T09:10'
    change_column_null :appointments, :end, false

  	#status may be: pending, completed, deleted (the appointment should not be deleted from db)
 	change_column :appointments, :status, :string, :limit => 30, default: 'pending'
 	change_column_null :appointments, :status, false
  end
  
  def down
 	change_column :appointments, :color, :string, default: nil
 	change_column_null :appointments, :color, true

 	change_column :appointments, :text_color, :string, default: nil
 	change_column_null :appointments, :text_color, true

    change_column :appointments, :title, :string, default: nil
    change_column_null :appointments, :title, true

    change_column :appointments, :start, :datetime, default: nil
    change_column_null :appointments, :start, true

    change_column :appointments, :end, :datetime, default: nil
    change_column_null :appointments, :end, true

 	change_column :appointments, :status, :string, limit: nil, default: nil
 	change_column_null :appointments, :status, true
  end
end
