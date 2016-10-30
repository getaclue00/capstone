class AddReferencesToAppointments < ActiveRecord::Migration[5.0]
  def up
  	#this adds car_id column in appointments table
    add_reference :appointments, :car, foreign_key: true, index: true, null: false

    add_reference :appointments, :service, foreign_key: true, index: true, null: false

    #can be null upon appointment creation waiting for admin to assign an employee
    add_reference :appointments, :employee, foreign_key: true, index: true, null: true 
  end
  def down
  	remove_reference :appointments, :car, foreign_key: true, index: true, null: false

  	remove_reference :appointments, :service, foreign_key: true, index: true, null: false

  	remove_reference :appointments, :employee, foreign_key: true, index: true, null: true
    #add_index
  end
end
