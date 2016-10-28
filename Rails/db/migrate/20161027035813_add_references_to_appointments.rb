class AddReferencesToAppointments < ActiveRecord::Migration[5.0]
  def up
  	#this adds car_id column in appointments table
    add_reference :appointments, :car, foreign_key: true, index: true, null: false

    add_reference :appointments, :service, foreign_key: true, index: true, null: false
  end
  def down
  	remove_reference :appointments, :car, foreign_key: true, index: true, null: false

  	remove_reference :appointments, :service, foreign_key: true, index: true, null: false
  end
end
