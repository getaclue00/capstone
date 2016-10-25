class AddReferencesToClients < ActiveRecord::Migration[5.0]
  def up
    add_reference :clients, :car, foreign_key: true, index: true
  end
  def down
  	remove_reference :clients, :car, foreign_key: true, index: true
  end
end
