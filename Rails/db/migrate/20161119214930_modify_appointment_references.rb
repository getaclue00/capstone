class ModifyAppointmentReferences < ActiveRecord::Migration[5.0]
  def up
 	change_column_null :appointments, :service_id, false

 	change_column :appointments, :employee_id, :integer, default: 0 #this is so that specifying an employee is not necessary upon creation
 	change_column_null :appointments, :employee_id, false
  end

  def down 
 	change_column_null :appointments, :service_id, true

 	change_column :appointments, :employee_id, :integer, default: nil #this is so that specifying an employee is not necessary upon creation
 	change_column_null :appointments, :employee_id, true
  end
end
