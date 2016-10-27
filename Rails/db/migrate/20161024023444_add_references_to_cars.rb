class AddReferencesToCars < ActiveRecord::Migration[5.0]
  def up
  	#this adds client_id column in cars table
    add_reference :cars, :client, foreign_key: true, index: true, null: false
  end
  def down
  	remove_reference :cars, :client, foreign_key: true, index: true, null: false
  end
end
