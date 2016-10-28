class ValidateAppointments < ActiveRecord::Migration[5.0]
   def up
  	#note: model contains additionnal checks

 	change_column_null :appointments, :day, false

 	change_column_null :appointments, :month, false

 	change_column_null :appointments, :year, false
 
 	#add validation for start_time and end_time

  	#status may be: pending, completed, deleted (the appointment should not be deleted from db)
 	change_column :appointments, :status, :string, :limit => 30, :default => "pending"
 	change_column_null :appointments, :status, false
  end
  
  def down
 	change_column_null :appointments, :day, true

 	change_column_null :appointments, :month, true

 	change_column_null :appointments, :year, true

  	change_column :appointments, :status, :string, :limit => nil, :default => nil
  	change_column_null :appointments, :status, true
  end
end
